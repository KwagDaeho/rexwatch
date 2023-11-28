'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@/recoil/atoms';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { styled } from '@mui/system';

import {
  StyledTable,
  StyledTableBody,
  StyledTableHead,
  StyledTableRow,
  TimeTableCell,
  LogTableCell,
  StyledTableRowTitle,
  TimeTableCellHeader,
  LogTableCellHeader,
  LogStyledTableBody,
  ScrollableDiv,
} from '../MuiStyled/Table';
import * as XLSX from 'xlsx';
import usePopup from '../usePopup';
import { useSignOut } from '@/utils/useSignOut/useSignOut';
import { AlertModal } from '../AlertModal';
import LoadingBar from '../LoadingBar';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from 'react-tooltip';
import { ClickButton } from '../ClickButton';
import Image from 'next/image';

function SystemLogTable() {
  const token = useRecoilValue(tokenState);
  const [logsDate, setLogsDate] = useState(moment());
  const [jsonResult, setJsonResult] = useState({ logs_data: [] });
  const { openPopup } = usePopup();
  const { handleSignOut } = useSignOut();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleDateChange = (date: any) => {
    setLogsDate(moment(date));
  };

  const [search, setSearch] = useState(false);
  const [showLoadingBar, setShowLoadingBar] = useState(false);

  const handleGetLogs = async () => {
    setJsonResult(null);

    const jsonData = {
      logs_date: logsDate.toISOString().split('T')[0], // YYYY-MM-DD format
    };
    setSearch(false);

    // 로딩 상태 활성화
    setLoading(true);
    setResultMessage('시스템 로그를 조회중입니다.');
    // Fetch data
    try {
      const response = await fetch('http://192.168.0.200:8080/api/v1/logs/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      setResultMessage(result.statusText);

      if (result.statusCode === 200) {
        setJsonResult(result);
        setSearch(true);
      }
      if (
        result.statusCode === 611 ||
        result.statusCode === 613 ||
        result.statusText === '필수 파라미터가 없습니다. (login_id)'
      ) {
        handleSignOut();
        setSearch(false);
      }
    } catch (error) {
      console.error('[USER][GET] i/f error=', error.toString());
      if (error.statusCode === 611 || error.statusCode === 613) {
        setResultMessage(error.statusText);
        setSearch(false);
        handleSignOut();
      }
    } finally {
      // 로딩 상태 비활성화
      setLoading(false);
    }
  };

  async function exportToExcel() {
    try {
      // await handleGetLogs();

      const excelData = jsonResult.logs_data;
      if (!excelData || excelData.length === 0) {
        console.error('No data to export');
        return;
      }
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `enforcement_${new Date().toISOString()}.xlsx`);
    } catch (err) {
      console.error(err);
      openPopup(err.statusText);
      if (
        err.statusCode === 611 ||
        err.statusCode === 402 ||
        err.statusCode === 613
      ) {
        handleSignOut();
        setIsModalOpen(false);
      }
      // handle error as appropriate...
    }
  }

  function renderWithNewlines(message?: string) {
    if (!message) return ''; // message가 undefined 또는 null 또는 빈 문자열이면 빈 문자열 반환

    return message.split('\n').map((str, index, array) =>
      index === array.length - 1 ? (
        str
      ) : (
        <>
          {str}
          <br />
        </>
      ),
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AlertModal
        message={resultMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Modal open={loading}>
        <ModalContainer>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                className="spinner-rotate"
                width={100}
                height={100}
                src="/spinner.svg"
                alt="Loading"
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {renderWithNewlines(resultMessage)}
            </div>
          </div>
        </ModalContainer>
      </Modal>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between', // Adjusted this to space-between
            alignItems: 'center',
            width: '100%',
            marginTop: '15px',
            marginBottom: '20px',
          }}
        >
          {/* Excel로 내보내기 버튼 */}
          <Tooltip
            place="bottom"
            style={{ fontSize: '12px', zIndex: 10 }}
            anchorSelect="#excelDownloadButton"
            content="Excel 다운로드"
          />
          <ClickButton
            title={<FileDownloadIcon />}
            id="excelDownloadButton"
            disabled={!search}
            background={search ? '#111111' : 'white'}
            onClick={exportToExcel}
          ></ClickButton>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DatePicker
              value={logsDate}
              onChange={handleDateChange}
              disableFuture
              sx={{
                marginRight: '8px',
                width: '200px',
              }}
              slotProps={{ textField: { size: 'small' } }}
            />
            <ClickButton
              title={'조회'}
              background="#2477ec"
              minwidth="80px"
              onClick={handleGetLogs}
            ></ClickButton>
          </div>
        </div>

        {loading && <LoadingBar />}
        {jsonResult?.logs_data && jsonResult?.logs_data.length > 0 ? (
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <ScrollableDiv>
              <StyledTable>
                <StyledTableHead>
                  <StyledTableRowTitle>
                    <TimeTableCellHeader>시간</TimeTableCellHeader>
                    <LogTableCellHeader>로그</LogTableCellHeader>
                  </StyledTableRowTitle>
                </StyledTableHead>
                <LogStyledTableBody>
                  {jsonResult?.logs_data.map((log, index) => (
                    <StyledTableRow key={index}>
                      <TimeTableCell>{log.time}</TimeTableCell>
                      <LogTableCell sx={{ textAlign: 'left' }}>
                        {log.logs}
                      </LogTableCell>
                    </StyledTableRow>
                  ))}
                </LogStyledTableBody>
              </StyledTable>
            </ScrollableDiv>
          </div>
        ) : (
          <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            <StyledTable>
              <StyledTableHead>
                <StyledTableRowTitle>
                  <TimeTableCellHeader>시간</TimeTableCellHeader>
                  <LogTableCellHeader>로그</LogTableCellHeader>
                </StyledTableRowTitle>
              </StyledTableHead>
              <StyledTableBody>
                <StyledTableRow>
                  <TimeTableCell colSpan={2}>
                    조회를 원하시는 날짜를 선택하신 후 조회 버튼을 클릭해 주세요.
                  </TimeTableCell>
                </StyledTableRow>
              </StyledTableBody>
            </StyledTable>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default SystemLogTable;

// const Modal = styled('div')`
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 9999;
// `;

const ModalContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '150px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
}));
