/* eslint-disable react-hooks/exhaustive-deps */
import { sendRequest } from '@/api/PostApi';
import { AlertDoubleButtonModal } from '@/components/AlertDoubleButtonModal';
import { AlertModal } from '@/components/AlertModal';
import { ClickButton } from '@/components/ClickButton';
import {
  cameraNameState,
  confirmPopupState,
  selectedSettingChannelState,
} from '@/recoil/atoms';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const RtspCameraView = () => {
  const [modeBaseData, setModeBaseData] = useState({
    Model: '',
    PerformanceMode: 0,
    Channel: 0,
    Command: 304,
  });
  const cameraName = useRecoilValue(cameraNameState);
  const selectedSettingChannel = useRecoilValue(selectedSettingChannelState);
  const [response, setResponse] = useState(null);
  const [confirmPopup, setConfirmPopup] = useRecoilState(confirmPopupState);
  const [alertPopup, setAlertPopup] = useState(false);
  const [wrongMessagePopup, setWrongMessagePopup] = useState(false);
  const [initialData, setInitialData] = useState({
    Model: '',
    PerformanceMode: 0,
    Channel: 0,
    Command: 304,
  });
  const algorithmSettingHandler = (e) => {
    let value;
    if (e.target.name === 'PerformanceMode') {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }

    setModeBaseData({
      ...modeBaseData,
      Channel: selectedSettingChannel + 1,
      Command: 304,
      [e.target.name]: value,
    });
  };

  const editClickButtonWithCheck = () => {
    if (
      initialData?.Model === modeBaseData.Model ||
      initialData.PerformanceMode === modeBaseData.PerformanceMode
    ) {
      setWrongMessagePopup(true);
    } else {
      setConfirmPopup((prevState) => ({
        ...prevState,
        algorithmEditButton: true,
      }));
    }
  };

  const saveSettingButton = () => {
    const fetchData = async () => {
      const result = await sendRequest(modeBaseData);
      setResponse(result);
    };
    fetchData();
  };

  const alertPopupCloseAction = () => {
    setAlertPopup(false);
    setConfirmPopup((prevState) => ({
      ...prevState,
      algorithmEditButton: false,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = { Command: 303, Channel: selectedSettingChannel + 1 };
      const result = await sendRequest(data);
      setModeBaseData(result);
      setInitialData(result);
    };
    fetchData();
  }, [selectedSettingChannel]);

  useEffect(() => {
    if (response?.AckNak === 1) {
      setAlertPopup(true);
    }
    if (response?.AckNak === 0) {
      alert('정보가 수정되지 않았습니다. 다시 한번 확인해주세요.');
    }
  }, [response]);
  return (
    <>
      {cameraName && (
        <Container>
          {/* Unhandled Runtime Error
TypeError: Cannot read properties of null (reading '0') */}
          <P>알고리즘 기반 설정 - {cameraName[selectedSettingChannel]}</P>
          <SelectBoxContainer>
            <SelectBox>
              <Ul>
                <Li>
                  <Label htmlFor="options">모델명</Label>
                  <Select
                    id="options"
                    value={modeBaseData?.Model}
                    name="Model"
                    onChange={algorithmSettingHandler}
                  >
                    <option value="MD_RoadKill 2111.IHCNN">
                      MD_RoadKill 2111.IHCNN
                    </option>
                    <option value="MD_Security 2108.IHCNN">
                      MD_Security 2108.IHCNN
                    </option>
                    <option value="MD_SignalExam 2111.IHCNN">
                      MD_SignalExam 2111.IHCNN
                    </option>
                    <option value="MD_Traffic_v2_18_2301.IHCNN">
                      MD_Traffic_v2_18_2301.IHCNN
                    </option>
                    <option value="MD_JTSExam 2201.IHCNN">
                      MD_JTSExam 2201.IHCNN
                    </option>
                  </Select>
                </Li>
                <Li>
                  <Label htmlFor="options">알고리즘 모드</Label>
                  <Select
                    id="options"
                    name="PerformanceMode"
                    value={modeBaseData?.PerformanceMode}
                    onChange={algorithmSettingHandler}
                  >
                    <option value={1}>최고 처리속도 모드</option>
                    <option value={2}>처리속도 향상 모드</option>
                    <option value={3}>기본 밸런스 모드</option>
                    <option value={4}>성능 향상 모드</option>
                    <option value={5}>최고 성능향상 모드</option>
                  </Select>
                </Li>
              </Ul>
              <ButtonContainer>
                <ClickButton
                  onClick={editClickButtonWithCheck}
                  background="#2477ec"
                  minwidth={'100px'}
                  title={'저장'}
                />
              </ButtonContainer>
            </SelectBox>
          </SelectBoxContainer>
        </Container>
      )}
      <AlertDoubleButtonModal
        message={'저장하시겠습니까?'}
        isOpen={confirmPopup.algorithmEditButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            algorithmEditButton: false,
          }))
        }
        actionFunction={saveSettingButton}
      />
      <AlertModal
        message={'저장되었습니다.'}
        isOpen={alertPopup}
        onClose={alertPopupCloseAction}
      />
      <AlertModal
        message={'변경된 내용이 없습니다.'}
        isOpen={wrongMessagePopup}
        onClose={() => setWrongMessagePopup(false)}
      />
    </>
  );
};

const Container = styled('div')`
  width: 100%;
`;
const SelectBoxContainer = styled('div')`
  width: 90%;
  margin: 0 auto;
`;
const SelectBox = styled('div')`
  width: 400px;
  padding: 20px 5px;
`;
const P = styled('p')`
  width: 90%;
  padding: 20px 5px;
  margin: 0 auto;
  font-weight: bold;
  font-size: 24px;
`;
const Ul = styled('ul')`
  width: 100%;
`;
const Li = styled('li')`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled('label')`
  width: 40%;
  font-size: 14px;
`;
const Select = styled('select')`
  width: 70%;
  padding: 10px;
  border-radius: 5px;
`;
const ButtonContainer = styled('div')`
  display: flex;
  justify-content: end;
  padding: 10px 0;
`;
