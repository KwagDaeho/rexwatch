/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { ClickButton } from '@/components/ClickButton';
import { useEffect, useState } from 'react';
import { NetworkSetting } from '@/components/NetworkSetting';
import { StreamingInfo } from '@/components/StreamingInfo';
import { ProgramInfo } from '@/components/ProgramInfo';
// import { ServiceSetting } from '@/components/ServiceSetting';
import { sendRequest } from '@/api/PostApi';
import { useRecoilState } from 'recoil';
import {
  moduleBoardNumErrorState,
  confirmPopupState,
  moduleGatwayErrorState,
  moduleIpAddressErrorState,
  moduleMacNumberErrorState,
  moduleSettingDataState,
  moduleSubnetMaskErrorState,
  moduleRtspUriErrorState,
  moduleWebRTCUriErrorState,
} from '@/recoil/atoms';
import { AlertDoubleButtonModal } from '@/components/AlertDoubleButtonModal';
import { AlertModal } from '@/components/AlertModal';

const ModuleSetting = () => {
  const router = useRouter();

  const [initialData, setInitialData] = useState({});
  const [confirmPopup, setConfirmPopup] = useRecoilState(confirmPopupState);
  const [saveResponse, setSaveResponse] = useState(null);
  const [alertPopup, setAlertPopup] = useState({
    reStart: false,
    reBoot: false,
    moduleSave: false,
    moduleSaveFailed: false,
    noChange: false,
  });
  const [totalData, setTotalData] = useRecoilState(moduleSettingDataState);
  const [BoardNumError, setBoardNumError] = useRecoilState(moduleBoardNumErrorState);
  const [macAddressError, setMacAddressError] = useRecoilState(
    moduleMacNumberErrorState,
  );
  const [ipAddressError, setIpAddressError] = useRecoilState(
    moduleIpAddressErrorState,
  );
  const [subnetMaskError, setSubnetMaskError] = useRecoilState(
    moduleSubnetMaskErrorState,
  );
  const [gatwayError, setGatwayError] = useRecoilState(moduleGatwayErrorState);
  const [rtspUriError, setRtspUriError] = useRecoilState(moduleRtspUriErrorState);
  const [webRTCError, setWebRTCError] = useRecoilState(moduleWebRTCUriErrorState);

  const dataChangeHandler = (e) => {
    setTotalData({ ...totalData, [e.target.name]: e.target.value });
  };

  // validation function
  const boardNumberValidation = () => {
    const value = totalData.BoardNum;
    const lengthValid =
      value?.toString().length >= 1 && value?.toString().length <= 3;
    const charValid = /^[0-9]*$/g.test(value?.toString());
    const validCheck = lengthValid && charValid && value >= 0 && value <= 999;
    return validCheck;
  };

  const ipValidation = () => {
    const value = totalData.IP;
    const ipv4Valid =
      /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(
        value,
      );
    const ipv6Valid = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]){1,4}$/.test(value);
    const lengthValid = value?.length <= 16;
    const validCheck = (ipv4Valid || ipv6Valid) && lengthValid;
    return validCheck;
  };
  const subnetMaskValidation = () => {
    const value = totalData.SubnetMask;
    const ipv4Valid =
      /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(
        value,
      );
    const ipv6Valid = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]){1,4}$/.test(value);
    const lengthValid = value?.length <= 16;
    const validCheck = (ipv4Valid || ipv6Valid) && lengthValid;
    return validCheck;
  };
  const gatwayValidation = () => {
    const value = totalData.GateWay;
    const ipv4Valid =
      /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(
        value,
      );
    const ipv6Valid = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]){1,4}$/.test(value);
    const lengthValid = value?.length <= 16;
    const validCheck = (ipv4Valid || ipv6Valid) && lengthValid;
    return validCheck;
  };
  const validationClick = () => {
    // initial data validation
    if (initialData === totalData) {
      setAlertPopup((prevState) => ({ ...prevState, noChange: true }));
      return false;
    } else {
      setAlertPopup((prevState) => ({ ...prevState, noChange: false }));
    }
    // boardNumberValidation
    if (!boardNumberValidation()) {
      setBoardNumError(true);
      return false;
    } else {
      setBoardNumError(false);
    }
    // Ip Address Validation
    if (!ipValidation()) {
      setIpAddressError(true);
      return false;
    } else {
      setIpAddressError(false);
    }
    // subnetMask
    if (!subnetMaskValidation()) {
      setSubnetMaskError(true);
      return false;
    } else {
      setSubnetMaskError(false);
    }
    // gateway
    if (!gatwayValidation()) {
      setGatwayError(true);
      return false;
    } else {
      setGatwayError(false);
    }
    return true;
  };
  const reStartAction = () => {
    const fetchData = async () => {
      const data = {
        Command: 4,
        ControlType: 1,
      };
      const result = await sendRequest(data);
    };
    fetchData();
    setAlertPopup((prevState) => ({ ...prevState, reStart: true }));
    setConfirmPopup((prevState) => ({
      ...prevState,
      restartButton: false,
    }));
  };

  const reBootAction = () => {
    const fetchData = async () => {
      const data = {
        Command: 4,
        ControlType: 2,
      };
      const result = await sendRequest(data);
    };
    fetchData();
    setAlertPopup((prevState) => ({ ...prevState, reBoot: true }));
    setConfirmPopup((prevState) => ({
      ...prevState,
      reBootButton: false,
    }));
  };

  const saveAction = () => {
    const fetchData = async () => {
      const BoardNum = Number(totalData?.BoardNum);
      const data = { Command: 2, BoardNum: BoardNum };
      const result = await sendRequest(data);
      setSaveResponse(result);
    };
    fetchData();
    setConfirmPopup((prevState) => ({
      ...prevState,
      moduleSaveButton: false,
    }));
  };

  const closeAndBackToLoginButton = () => {
    setAlertPopup({
      moduleSave: false,
      reBoot: false,
      reStart: false,
      moduleSaveFailed: false,
      noChange: false,
    });
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = { Command: 1 };
      const result = await sendRequest(data);
      setTotalData(result);
      setInitialData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (saveResponse?.AckNak === 1) {
      setAlertPopup((prevState) => ({ ...prevState, moduleSave: true }));
    }
    if (saveResponse?.AckNak === 0) {
      setAlertPopup((prevState) => ({ ...prevState, moduleSaveFailed: true }));
    }
  }, [saveResponse]);

  return (
    <>
      <ContainerForModule>
        <H1>모듈 설정</H1>
        <hr />
        <ButtonComponents>
          <ClickButton
            onClick={() =>
              setConfirmPopup((prevState) => ({
                ...prevState,
                restartButton: true,
              }))
            }
            title={'소프트웨어 재시작'}
            background="#d2651d"
          />
          <ClickButton
            onClick={() =>
              setConfirmPopup((prevState) => ({
                ...prevState,
                reBootButton: true,
              }))
            }
            title={'모듈 재부팅'}
            background="#cb3838"
          />
          <ClickButton
            onClick={() => {
              if (validationClick()) {
                setConfirmPopup((prevState) => ({
                  ...prevState,
                  moduleSaveButton: true,
                }));
              }
            }}
            title={'설정 저장'}
            background="#2477ec"
          />
        </ButtonComponents>
        <GridGroup>
          <NetworkSetting
            initialData={initialData}
            dataChangeHandler={dataChangeHandler}
          />
          <StreamingInfo
            initialData={initialData}
            dataChangeHandler={dataChangeHandler}
          />
          <ProgramInfo
            initialData={initialData}
            dataChangeHandler={dataChangeHandler}
          />
          {/* <ServiceSetting
            updateModuleData={updateModuleData}
          /> */}
        </GridGroup>
      </ContainerForModule>
      <AlertDoubleButtonModal
        message={'소프트웨어를 재시작 하시겠습니까?'}
        isOpen={confirmPopup.restartButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            restartButton: false,
          }))
        }
        actionFunction={reStartAction}
      />
      <AlertDoubleButtonModal
        message={'모듈을 재부팅 하시겠습니까?'}
        isOpen={confirmPopup.reBootButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            reBootButton: false,
          }))
        }
        actionFunction={reBootAction}
      />
      <AlertDoubleButtonModal
        message={'설정 정보를 저장하시겠습니까?'}
        isOpen={confirmPopup.moduleSaveButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            moduleSaveButton: false,
          }))
        }
        actionFunction={saveAction}
      />
      <AlertModal
        message={'프로그램이 재시작됩니다. 잠시후 다시 로그인 해주세요.'}
        isOpen={alertPopup.reStart}
        onClose={closeAndBackToLoginButton}
      />
      <AlertModal
        message={'모듈이 재부팅됩니다. 잠시후 다시 로그인 해주세요.'}
        isOpen={alertPopup.reBoot}
        onClose={closeAndBackToLoginButton}
      />
      <AlertModal
        message={'설정이 저장되었습니다.'}
        isOpen={alertPopup.moduleSave}
        onClose={() =>
          setAlertPopup({
            moduleSave: false,
            reBoot: false,
            reStart: false,
            moduleSaveFailed: false,
            noChange: false,
          })
        }
      />
      <AlertModal
        message={'저장에 실패했습니다.'}
        isOpen={alertPopup.moduleSaveFailed}
        onClose={() =>
          setAlertPopup({
            moduleSave: false,
            reBoot: false,
            reStart: false,
            moduleSaveFailed: false,
            noChange: false,
          })
        }
      />
      <AlertModal
        message={'변경된 내용이 없습니다.'}
        isOpen={alertPopup.noChange}
        onClose={() =>
          setAlertPopup({
            moduleSave: false,
            reBoot: false,
            reStart: false,
            moduleSaveFailed: false,
            noChange: false,
          })
        }
      />
    </>
  );
};

export default ModuleSetting;

const ContainerForModule = styled('div')`
  width: 100%;
`;
const H1 = styled('h2')`
  padding: 20px 0;
  width: 90%;
`;
const ButtonComponents = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-top: 20px;
`;

const GridGroup = styled('div')`
  width: 100%;
  padding-top: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;
