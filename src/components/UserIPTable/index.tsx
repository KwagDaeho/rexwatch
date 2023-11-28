import { changeStatusState, modalOpenState, tokenState } from '@/recoil/atoms';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ScrollableDiv,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableCellHeader,
  StyledTableHead,
  StyledTableRow,
  StyledTableRowTitle,
  TimeTableCell,
} from '../MuiStyled/Table';
import { Button, FormControlLabel, Radio, Typography } from '@mui/material';
import { AlertModal } from '../AlertModal';
import { AlertDoubleButtonModal } from '../AlertDoubleButtonModal';
import { useSignOut } from '@/utils/useSignOut/useSignOut';

type User = {
  USER_ID: string;
  USER_TYPE: string;
  ACCS_DATA: string;
  ACCS_TYPE: string;
  USER_EMAIL: string;
  LAST_LOGIN_DT: string;
  STAT: string;
  ROW_NUM: number;
  LAST_LOGIN_IP: string;
  FAIL_COUNT: number;
};
type UserIPTableState = {
  isAllAllowed: boolean;
  isSpecificIPAllowed: boolean;
};

type JsonResultType = {
  accs_list?: User[];
};

function UserIPTable() {
  const [token, setToken] = useRecoilState(tokenState);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
  const [userType, setUserType] = useState('ALL');
  const [userStat, setUserStat] = useState('ALL');
  const [userId, setUserId] = useState('');
  const [pageCnt, setPageCnt] = useState('1000');
  const [pageIdx, setPageIdx] = useState('1');
  const { handleSignOut } = useSignOut();
  const [changeStatus, setChangeStatus] = useRecoilState(changeStatusState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [accessData, setAccessData] = useState(null);
  const [changeAnyAccess, setChangeAnyAccess] = useState(false);

  const [jsonResult, setJsonResult] = useState<JsonResultType>({});

  const [selectedState, setSelectedState] = useState<UserIPTableState>({
    isAllAllowed: false,
    isSpecificIPAllowed: false,
  });
  const [tempState, setTempState] = useState<UserIPTableState>({
    isAllAllowed: false,
    isSpecificIPAllowed: false,
  });

  const handleListClick = () => {
    const jsonData = {
      user_type: userType,
      user_stat: userStat,
      user_id: userId,
      page_cnt: pageCnt,
      page_idx: pageIdx,
    };

    fetch('http://192.168.0.200:8080/api/v1/accs/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.statusText === '필수 파라미터가 없습니다. (login_id)' ||
          data.statusCode === 613 ||
          data.statusCode === 611
        ) {
          handleSignOut();
        }
        setJsonResult(data);
      })
      .catch((error) => {
        setJsonResult(error);
      });
  };

  const actualSetFunction = (accs_stat: string) => {
    const jsonData = { accs_stat };

    fetch('http://192.168.0.200:8080/api/v1/accs/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((result) => {
        setResultMessage(result.statusText);
        setIsModalOpen(false);
        setChangeAnyAccess(true);
      })
      .catch((error) => {
        setResultMessage(error.statusText);
        setIsModalOpen(false);
      });
  };

  const handleSet = (accs_stat: 'A' | 'L') => {
    if (accs_stat === 'A') {
      setTempState({ isAllAllowed: true, isSpecificIPAllowed: false });
    } else {
      setTempState({ isAllAllowed: false, isSpecificIPAllowed: true });
    }
    setIsModalOpen(true);
  };

  const onModalConfirm = () => {
    setSelectedState(tempState);
    const accs_stat = tempState.isAllAllowed
      ? 'A'
      : tempState.isSpecificIPAllowed
      ? 'L'
      : null;
    if (accs_stat) {
      actualSetFunction(accs_stat);
    } else {
      console.error('No checkbox is selected!');
    }
  };

  const handleModalClose = () => {
    setTempState(selectedState);
    setIsModalOpen(false);
  };
  const handleDelete = (accsData: string) => {
    const jsonData = { accs_data: accsData };

    fetch('http://192.168.0.200:8080/api/v1/accs/del', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((result) => {
        setDeleteModalOpen(false);
        handleListClick();
        setResultMessage(result.statusText);

        setDeleteSuccessModalOpen(true);
      })
      .catch((error) => {
        console.log('[JJH][del] i/f error=', error);
      });
  };

  useEffect(() => {
    handleListClick();
  }, [changeStatus]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const getTokenData = () => {
      fetch('http://192.168.0.200:8080/api/v1/accs/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('[USER][GET] success=', data);
          // data에 따라 라디오 버튼 초기값 설정
          if (data && data.accs_stat === 'A') {
            setSelectedState({
              isAllAllowed: true,
              isSpecificIPAllowed: false,
            });
            setTempState({
              isAllAllowed: true,
              isSpecificIPAllowed: false,
            });
          } else if (data && data.accs_stat === 'L') {
            setSelectedState({
              isAllAllowed: false,
              isSpecificIPAllowed: true,
            });
            setTempState({
              isAllAllowed: false,
              isSpecificIPAllowed: true,
            });
          }
        })
        .catch((error) => {
          console.log('[USER][GET] error=', error);
        });
    };

    getTokenData();
    handleListClick();
  }, []);

  return (
    <div>
      <div>
        <AlertDoubleButtonModal
          message={'해당 IP를 삭제할까요?'}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          actionFunction={() => handleDelete(accessData)}
        />
      </div>
      <AlertModal
        message={resultMessage}
        isOpen={deleteSuccessModalOpen}
        onClose={() => setDeleteSuccessModalOpen(false)}
      />

      <AlertDoubleButtonModal
        message={'접근 제한 상태를 변경할까요?'}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        actionFunction={onModalConfirm}
      />
      <AlertModal
        message={resultMessage}
        isOpen={changeAnyAccess}
        onClose={() => setChangeAnyAccess(false)}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <FormControlLabel
          control={
            <Radio
              checked={tempState.isAllAllowed}
              onChange={() => handleSet('A')}
            />
          }
          label={<Typography>전체 허용</Typography>}
        />
        <FormControlLabel
          control={
            <Radio
              checked={tempState.isSpecificIPAllowed}
              onChange={() => handleSet('L')}
            />
          }
          label={<Typography>설정된 아이피만 접근 허용</Typography>}
        />
      </div>
      {jsonResult.accs_list ? (
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
                  <StyledTableCellHeader>NO</StyledTableCellHeader>
                  <StyledTableCellHeader>
                    접근 가능 아이피 주소
                  </StyledTableCellHeader>
                  {/* <StyledTableCell>타입</StyledTableCell> */}
                  <StyledTableCellHeader>삭제</StyledTableCellHeader>
                </StyledTableRowTitle>
              </StyledTableHead>
              <StyledTableBody>
                {jsonResult.accs_list.map((user) => (
                  <StyledTableRow key={user.ROW_NUM}>
                    <StyledTableCell>{user.ROW_NUM}</StyledTableCell>
                    <StyledTableCell>{user.ACCS_DATA}</StyledTableCell>
                    {/* <StyledTableCell>{user.ACCS_TYPE}</StyledTableCell> */}
                    <StyledTableCell>
                      <Button
                        onClick={() => {
                          setDeleteModalOpen(true), setAccessData(user.ACCS_DATA);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            </StyledTable>
          </ScrollableDiv>
        </div>
      ) : (
        <StyledTable>
          <StyledTableHead>
            <StyledTableRowTitle>
              <StyledTableCellHeader>NO</StyledTableCellHeader>
              <StyledTableCellHeader>접근 가능 아이피 주소</StyledTableCellHeader>
              <StyledTableCellHeader>삭제</StyledTableCellHeader>
            </StyledTableRowTitle>
          </StyledTableHead>
          <StyledTableBody>
            <StyledTableRow>
              <TimeTableCell colSpan={3}>조회된 데이터가 없습니다.</TimeTableCell>
            </StyledTableRow>
          </StyledTableBody>
        </StyledTable>
      )}
    </div>
  );
}

export default UserIPTable;
