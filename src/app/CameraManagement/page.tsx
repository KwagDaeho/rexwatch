/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
'use client';
import { ClickButton } from '@/components/ClickButton';
import { DetailModal } from '@/components/Modal/DetailModal';
import { RegisterModal } from '@/components/Modal/RegisterModal';
import { CameraListHeader, emptyCameraInformation } from '@/data/cameraData';
import {
  cameraCountState,
  cameraListDataState,
  clickedItemDataState,
  loadingState,
  modalOpenState,
  refreshState,
  selectedListIndexState,
} from '@/recoil/atoms';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sendRequest } from '@/api/PostApi';
import { TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableCellHeader,
  StyledTableHead,
  StyledTableRow,
  StyledTableRowTitle,
} from '@/components/MuiStyled/Table';
import { Tooltip } from 'react-tooltip';
import { AlertModal } from '@/components/AlertModal';
import { AlertDoubleButtonModal } from '@/components/AlertDoubleButtonModal';

const CameraManagement = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [clickedItemData, setClickedItemData] = useRecoilState(clickedItemDataState);
  const [cameraListData, setCameraListData] = useRecoilState(cameraListDataState);
  const [cameraCount, setCameraCount] = useRecoilState(cameraCountState);
  const [connectionCheck, setConnectionCheck] = useState(null);
  const [mergedData, setMergedData] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedListIndexState);
  const [resetConfirmPopup, setResetConfirmPopup] = useState(false);
  const [resetPopup, setResetPopup] = useState({ success: false, fail: false });
  const refreshKey = useRecoilValue(refreshState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const cameraListHeader = CameraListHeader?.map((element) => {
    return <StyledTableCellHeader>{element}</StyledTableCellHeader>;
  });

  const EdithandleClick = (element, index) => {
    setModalOpen((prevState) => ({ ...prevState, editModal: true }));
    setClickedItemData(element);
    setSelectedIndex(index);
  };

  const RegisterHandleClick = () => {
    setClickedItemData(emptyCameraInformation);
    setModalOpen((prevState) => ({ ...prevState, registerModal: true }));
  };

  const ResetHandleClick = () => {
    const fetchData = async () => {
      const result = await sendRequest({ Command: 103, Channel: selectedIndex + 1 });
      setResponse(result);
    };
    fetchData();
  };

  const fetchListData = async () => {
    const data = { Command: 101 };
    const result = await sendRequest(data);
    const sortedData = result?.Cameras?.sort((a, b) => a.Channel - b.Channel);
    const camName = sortedData?.map((element) => {
      return element.Name;
    });
    setCameraListData(sortedData);
    setCameraCount(result?.Cameras?.length);
  };

  const cameraListContents = mergedData?.map((element, index) => {
    return (
      <>
        <StyledTableRow
          key={`key-${element.Channel}`}
          onClick={() => {
            EdithandleClick(element, index);
          }}
          style={{
            backgroundColor: index === selectedIndex ? '#2477ec21' : undefined,
          }}
        >
          <StyledTableCell>{element.Channel}</StyledTableCell>
          <StyledTableCell>{element.CameraID}</StyledTableCell>
          <StyledTableCell>{element.Name}</StyledTableCell>
          <StyledTableCell>{element.IP}</StyledTableCell>
          <StyledTableCell>{element.RtspPort}</StyledTableCell>
          <StyledTableCell>{element.RtspID}</StyledTableCell>
          <StyledTableCell>{element.RtspPW ? '*****' : ''}</StyledTableCell>
          <StyledTableCell>
            {element.LicenseKey ? element.LicenseKey : '-'}
          </StyledTableCell>
          <StyledTableCell>
            {element.Connected ? (
              <CircleSpanActive key={Math.random()}>Active</CircleSpanActive>
            ) : (
              <CircleSpanDisabled key={Math.random()}>Disabled</CircleSpanDisabled>
            )}
          </StyledTableCell>
          <StyledTableCell>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#resetButton"
              content="재시작"
            />
            <ClickButton
              id="resetButton"
              key={index}
              onClick={(e) => {
                setSelectedIndex(index);
                e.stopPropagation();
                setResetConfirmPopup(true);
              }}
              title={<RefreshIcon />}
            />
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
  });
  useEffect(() => {
    fetchListData();
    setModalOpen((prevState) => ({
      ...prevState,
      editModal: false,
      registerModal: false,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalRefreshData = async () => {
    const listData = { Command: 101 };
    const listResult = await sendRequest(listData);
    const listSortedData = listResult?.Cameras?.sort(
      (a, b) => a.Channel - b.Channel,
    );
    const aliveData = { Command: 901 };
    const aliveResult = await sendRequest(aliveData);
    const sortedData = aliveResult?.Channels?.sort((a, b) => a.Number - b.Number);
    const mergedData = listSortedData?.map((item, index) => {
      return {
        ...item,
        Connected: sortedData.map((element) => element.Alive)[index],
      };
    });
    setMergedData(mergedData);
    setCameraCount(listResult?.Cameras?.length);
  };

  useEffect(() => {
    if (refreshKey) {
      totalRefreshData();
    }
  }, [refreshKey]);

  useEffect(() => {
    const fetchData = async () => {
      // Channel index 별로 가져와야 함
      const data = { Command: 901 };
      const result = await sendRequest(data);
      const sortedData = result?.Channels?.sort((a, b) => a.Number - b.Number);
      setConnectionCheck(sortedData.map((element) => element.Alive));
    };
    fetchData();
    const intervalId = setInterval(fetchData, 20000); // 20초 간격으로 fetchData 실행

    // 컴포넌트가 언마운트될 때 동작을 멈춤
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (connectionCheck) {
      const mergedData = cameraListData?.map((item, index) => {
        return { ...item, Connected: connectionCheck[index] };
      });
      setMergedData(mergedData);
    }
  }, [connectionCheck]);

  useEffect(() => {
    if (response?.AckNak === 1) {
      setResetPopup((prevState) => ({ fail: false, success: true }));
    }
    if (response?.AckNak === 0) {
      setResetPopup((prevState) => ({ success: false, fail: true }));
    }
  }, [response]);

  return (
    <>
      <H1>카메라 관리</H1>
      <hr />
      <ButtonContainer>
        <Tooltip
          place="bottom"
          style={{ fontSize: '12px', zIndex: 10 }}
          anchorSelect="#registerButton"
          content="카메라 등록은 최대 4개까지 가능합니다."
        />
        {cameraCount === 4 ? (
          <>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#registerButton"
              content="카메라 등록은 최대 4개까지 가능합니다."
            />
            <ClickButton
              id="registerButton"
              minwidth={'100px'}
              title={'등록 불가'}
            />
          </>
        ) : (
          <ClickButton
            background="#2477ec"
            minwidth={'80px'}
            title={'등록'}
            onClick={RegisterHandleClick}
          />
        )}
      </ButtonContainer>
      <CameraListContainer>
        <StyledTable>
          <StyledTableHead>
            <StyledTableRowTitle>{cameraListHeader}</StyledTableRowTitle>
          </StyledTableHead>
          <StyledTableBody>{cameraListContents}</StyledTableBody>
        </StyledTable>
      </CameraListContainer>

      {modalOpen.editModal && <DetailModal />}
      {modalOpen.registerModal && <RegisterModal />}
      <AlertDoubleButtonModal
        message={'재시작 하시겠습니까?'}
        isOpen={resetConfirmPopup}
        onClose={() => setResetConfirmPopup(false)}
        actionFunction={ResetHandleClick}
      />
      <AlertModal
        message={'재시작되었습니다.'}
        isOpen={resetPopup.success}
        onClose={() => {
          setResetPopup((prevState) => ({ success: false, fail: false }));
          setResetConfirmPopup(false);
        }}
      />
      <AlertModal
        message={'재시작 실패하였습니다.'}
        isOpen={resetPopup.fail}
        onClose={() => {
          setResetPopup((prevState) => ({ success: false, fail: false }));
          setResetConfirmPopup(false);
        }}
      />
    </>
  );
};

export default CameraManagement;

const CameraListContainer = styled(TableContainer)`
  margin: 0 auto;
  min-height: 200px;
`;

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: end;
  padding: 20px 0;
  width: 100%;
  margin: 0 auto;
`;

const blinkAnimation = keyframes`
  0%, 33%, 67% { opacity: 1; }
  16.5%, 50% { opacity: 0; }
  100% { opacity: 1; }
`;

const CircleSpanActive = styled('span')`
  display: inline-block;
  width: 70px;
  color: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 3px 6px;
  font-size: 12px;
  background-color: #81c649;
  animation: ${blinkAnimation} 3s;
`;

const CircleSpanDisabled = styled('span')`
  display: inline-block;
  width: 70px;
  color: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 3px 6px;
  font-size: 12px;
  background-color: #ff9183;
  animation: ${blinkAnimation} 3s;
`;

const H1 = styled('h2')`
  width: 100%;
  padding: 20px 0;
  margin: 0 auto;
`;
