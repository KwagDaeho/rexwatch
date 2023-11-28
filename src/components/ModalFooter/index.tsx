/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from 'recoil';
import {
  cameraIdErrorState,
  cameraNameErrorState,
  clickedItemDataState,
  confirmPopupState,
  inputValidState,
  ipErrorState,
  licenseKeyErrorState,
  loadingState,
  modalOpenState,
  notChangedMessageState,
  refreshState,
  rtspIdErrorState,
  rtspPortErrorState,
  rtspPwErrorState,
  rtspUriErrorState,
  selectedListIndexState,
  settingModalDataState,
} from '@/recoil/atoms';
import styled from '@emotion/styled';
import { ClickButton } from '../ClickButton';
import { sendRequest } from '@/api/PostApi';
import { useEffect, useState } from 'react';
import { AlertModal } from '../AlertModal';
import { AlertDoubleButtonModal } from '../AlertDoubleButtonModal';
import Image from 'next/image';

interface PropsType {}

export const ModalFooter = (props: PropsType) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [clickedItemData, setClickedItemData] = useRecoilState(clickedItemDataState);
  const [OSD, setOSD] = useRecoilState(settingModalDataState);
  const [initialClickedData, setInitialClickedData] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedListIndexState);
  const [editResponse, setEditResponse] = useState(null);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [saveResponse, setSaveResponse] = useState(null);
  const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [isValid, setIsValid] = useRecoilState(inputValidState);
  const [confirmPopup, setConfirmPopup] = useRecoilState(confirmPopupState);
  const [notChangedMessage, setNotChangedMessage] = useRecoilState(
    notChangedMessageState,
  );
  const [cameraIdError, setCameraIdError] = useRecoilState(cameraIdErrorState);
  const [ipError, setIpError] = useRecoilState(ipErrorState);
  const [licenseKeyError, setLicenseKeyError] = useRecoilState(licenseKeyErrorState);
  const [cameraNameError, setCameraNameError] = useRecoilState(cameraNameErrorState);
  const [rtspIdError, setRtspIdError] = useRecoilState(rtspIdErrorState);
  const [rtspPwError, setRtspPwError] = useRecoilState(rtspPwErrorState);
  const [rtspPortError, setRtspPortError] = useRecoilState(rtspPortErrorState);
  const [rtspUriError, setRtspUriError] = useRecoilState(rtspUriErrorState);
  const [alertPopup, setAlertPopup] = useState({
    osdSave: false,
    register: false,
    delete: false,
    edit: false,
  });
  const [wrongMessagePopup, setWrongMessagePopup] = useState({
    osdSave: false,
    register: false,
    delete: false,
    edit: false,
  });

  // validation function
  const cameraIdValidation = () => {
    const value = clickedItemData.CameraID;
    const lengthValid = value?.length >= 1 && value?.length <= 10;
    const CharValid = /^[a-zA-Z0-9]*$/g;
    const validCheck = lengthValid && CharValid.test(value);
    return validCheck;
  };
  const ipValidation = () => {
    const value = clickedItemData.IP;
    const ipv4Valid =
      /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(
        value,
      );
    const ipv6Valid = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]){1,4}$/.test(value);
    const lengthValid = value?.length <= 16;
    const validCheck = (ipv4Valid || ipv6Valid) && lengthValid;
    return validCheck;
  };
  const licenseValidation = () => {
    const value = clickedItemData.LicenseKey;
    const validCheck = /^[A-Z0-9]{16}$/.test(value);
    return validCheck;
  };
  const nameValidation = () => {
    const value = clickedItemData.Name;
    const lengthValid = value && value.length > 0 && value.length <= 32;
    const charValid = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$/i.test(value);
    const validCheck = lengthValid && charValid;
    return validCheck;
  };
  const rtspIdValidation = () => {
    const value = clickedItemData.RtspID;
    const CharValid = /^[a-zA-Z0-9]*$/.test(value);
    const lengthValid = value?.length >= 1 && value?.length <= 32;
    const validCheck = CharValid && lengthValid;

    return validCheck;
  };
  const rtspPWValidation = () => {
    const value = clickedItemData.RtspPW;
    const lengthValid = value?.length >= 1 && value?.length <= 32;
    const CharValid = /^[\w!@#$%^&*()-+=,.?]+$/; // 영문 소/대문자, 숫자, 특수문자 범위
    const validCheck = lengthValid && CharValid.test(value);

    return validCheck;
  };
  const rtspPortValidation = () => {
    const value = clickedItemData.RtspPort;
    const validCheck =
      /^[0-9]*$/.test(value) &&
      parseInt(value, 10) >= 0 &&
      parseInt(value, 10) <= 65535;

    return validCheck;
  };
  const rtspUriValidation = () => {
    const value = clickedItemData.RtspUri;
    const validCheck =
      /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{1,32}$/.test(value);

    return validCheck;
  };
  const validationClick = () => {
    if (initialClickedData === clickedItemData) {
      setNotChangedMessage(true);
      return false;
    } else {
      setNotChangedMessage(false);
    }
    // CameraID validation
    if (!cameraIdValidation()) {
      setCameraIdError(true);
      return false;
    } else {
      setCameraIdError(false);
    }
    // Camera Name validation
    if (!nameValidation()) {
      setCameraNameError(true);
      return false;
    } else {
      setCameraNameError(false);
    }
    // IP validation
    if (!ipValidation()) {
      setIpError(true);
      return false;
    } else {
      setIpError(false);
    }
    // Rtsp Port validation
    if (!rtspPortValidation()) {
      setRtspPortError(true);
      return false;
    } else {
      setRtspPortError(false);
    }
    // Rtsp Id validation
    if (!rtspIdValidation()) {
      setRtspIdError(true);
      return false;
    } else {
      setRtspIdError(false);
    }
    // Rtsp PW validation
    if (!rtspPWValidation()) {
      setRtspPwError(true);
      return false;
    } else {
      setRtspPwError(false);
    }
    // Rtsp URI validation
    if (!rtspUriValidation()) {
      setRtspUriError(true);
      return false;
    } else {
      setRtspUriError(false);
    }
    // license validation
    if (!licenseValidation()) {
      setLicenseKeyError(true);
      return false;
    } else {
      setLicenseKeyError(false);
    }

    return true;
  };

  const handleCloseClick = () => {
    setModalOpen((prevState) => ({
      ...prevState,
      settingModal: false,
      registerModal: false,
      addUserModal: false,
      editModal: false,
    }));
    setSelectedIndex(null);
    console.log('hello');
  };

  const handleDeleteClick = () => {
    const fetchData = async () => {
      const data = {
        Command: 102,
        Channel: initialClickedData.Channel,
        Operation: 3, //삭제
        LicenseKey: initialClickedData.LicenseKey,
        CameraID: initialClickedData.CameraID,
        Name: initialClickedData.Name,
        IP: initialClickedData.IP,
        RtspUri: initialClickedData.RtspUri,
      }; // 101로 나중에 변경?
      const result = await sendRequest(data);
      setDeleteResponse(result);
    };
    fetchData();
    setIsLoading((prevState) => ({ ...prevState, delete: true }));
  };

  const handleEditClick = () => {
    const fetchData = async () => {
      const data = {
        Command: 102,
        Channel: clickedItemData.Channel,
        Operation: 2, //변경
        LicenseKey: clickedItemData.LicenseKey,
        CameraID: clickedItemData.CameraID,
        Name: clickedItemData.Name,
        IP: clickedItemData.IP,
        RtspUri: clickedItemData.RtspUri,
      };
      const result = await sendRequest(data);
      setEditResponse(result);
    };
    fetchData();
  };

  const handleCameraRegisterClick = () => {
    const fetchData = async () => {
      const data = {
        Command: 102,
        Channel: clickedItemData.Channel,
        Operation: 1, // 등록
        LicenseKey: clickedItemData.LicenseKey,
        CameraID: clickedItemData.CameraID,
        Name: clickedItemData.Name,
        RtspID: clickedItemData.RtspID,
        RtspPW: clickedItemData.RtspPW,
        RtspPort: clickedItemData.RtspPort,
        IP: clickedItemData.IP,
        RtspUri: clickedItemData.RtspUri,
      }; // 101로 나중에 변경?
      const result = await sendRequest(data);
      setRegisterResponse(result);
    };
    fetchData();
  };

  const handleCameraSettingSaveClick = () => {
    const fetchData = async () => {
      const data = { Command: 105, OSD };
      const result = await sendRequest(data);
      setSaveResponse(result);
    };
    fetchData();
  };

  const alertPopupCloseAction = (updatedStates) => {
    setAlertPopup((prevState) => ({ ...prevState, ...updatedStates.alert }));
    setConfirmPopup((prevState) => ({
      ...prevState,
      ...updatedStates.confirm,
    }));
    setModalOpen((prevState) => ({ ...prevState, ...updatedStates.modal }));
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (deleteResponse?.AckNak === 1) {
      setIsLoading((prevState) => ({ ...prevState, delete: false }));
      setAlertPopup((prevState) => ({ ...prevState, delete: true }));
    }
    if (deleteResponse?.AckNak === 0) {
      setIsLoading((prevState) => ({ ...prevState, delete: false }));
      setWrongMessagePopup((prevState) => ({ ...prevState, delete: true }));
    }
    if (editResponse?.AckNak === 1) {
      setAlertPopup((prevState) => ({ ...prevState, edit: true }));
    }
    if (editResponse?.AckNak === 0) {
      setWrongMessagePopup((prevState) => ({ ...prevState, edit: true }));
    }
    if (registerResponse?.AckNak === 1) {
      setIsLoading((prevState) => ({ ...prevState, register: true }));
      setTimeout(() => {
        setIsLoading((prevState) => ({ ...prevState, register: false }));
        setAlertPopup((prevState) => ({ ...prevState, register: true }));
      }, 5000);
    }
    if (registerResponse?.AckNak === 0) {
      setWrongMessagePopup((prevState) => ({ ...prevState, register: true }));
    }
    if (saveResponse?.AckNak === 1) {
      setAlertPopup((prevState) => ({ ...prevState, osdSave: true }));
    }
    if (saveResponse?.AckNak === 0) {
      setWrongMessagePopup((prevState) => ({ ...prevState, osdSave: true }));
    }
  }, [deleteResponse, editResponse, registerResponse, saveResponse]);

  useEffect(() => {
    setInitialClickedData(clickedItemData);
  }, []);

  const modalCaseReturn = () => {
    return (
      <>
        {modalOpen.editModal && (
          <ButtonContainerThree>
            <ClickButton
              title={'닫기'}
              background="#d3d4d6"
              minwidth="120px"
              onClick={handleCloseClick}
            />
            <ClickButton
              title={'삭제'}
              background="#cb3838"
              minwidth="120px"
              onClick={() => {
                setConfirmPopup((prevState) => ({
                  ...prevState,
                  infoDeleteButton: true,
                }));
              }}
            />
            <ClickButton
              background="#2477ec"
              title={'수정'}
              minwidth="120px"
              onClick={() => {
                if (validationClick()) {
                  setConfirmPopup((prevState) => ({
                    ...prevState,
                    infoEditButton: true,
                  }));
                }
              }}
            />
          </ButtonContainerThree>
        )}
        {modalOpen.registerModal && (
          <ButtonContainerTwo>
            <ClickButton
              title={'닫기'}
              background="#d3d4d6"
              minwidth="120px"
              onClick={handleCloseClick}
            />
            <ClickButton
              title={'등록'}
              background="#2477ec"
              minwidth="120px"
              onClick={() => {
                if (validationClick()) {
                  setConfirmPopup((prevState) => ({
                    ...prevState,
                    infoRegisterButton: true,
                  }));
                }
              }}
            />
          </ButtonContainerTwo>
        )}
        {modalOpen.settingModal && (
          <ButtonContainerTwo>
            <ClickButton
              title={'닫기'}
              background="#d3d4d6"
              minwidth="120px"
              onClick={handleCloseClick}
            />
            <ClickButton
              title={'저장'}
              background="#2477ec"
              minwidth="120px"
              onClick={() => {
                setConfirmPopup((prevState) => ({
                  ...prevState,
                  osdSaveButton: true,
                }));
              }}
            />
          </ButtonContainerTwo>
        )}
      </>
    );
  };

  return (
    <Container>
      {modalCaseReturn()}
      <AlertDoubleButtonModal
        message={'저장하시겠습니까?'}
        isOpen={confirmPopup.osdSaveButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            osdSaveButton: false,
          }))
        }
        actionFunction={handleCameraSettingSaveClick}
      />
      <AlertModal
        message={'OSD 설정이 저장되었습니다.'}
        isOpen={alertPopup.osdSave}
        onClose={() => {
          alertPopupCloseAction({
            alert: { osdSave: false },
            confirm: { osdSaveButton: false },
            modal: { settingModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertModal
        message={'OSD 설정에 실패했습니다.'}
        isOpen={wrongMessagePopup.osdSave}
        onClose={() => {
          alertPopupCloseAction({
            alert: { osdSave: false },
            confirm: { osdSaveButton: false },
            modal: { settingModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertDoubleButtonModal
        message={'카메라 정보를 삭제하시겠습니까?'}
        isOpen={confirmPopup.infoDeleteButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            infoDeleteButton: false,
          }))
        }
        actionFunction={handleDeleteClick}
      />
      <AlertModal
        message={'카메라 정보가 삭제되었습니다.'}
        isOpen={alertPopup.delete}
        onClose={() => {
          alertPopupCloseAction({
            alert: { delete: false },
            confirm: { infoDeleteButton: false },
            modal: { editModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertModal
        message={'삭제에 실패했습니다.'}
        isOpen={wrongMessagePopup.delete}
        onClose={() => {
          alertPopupCloseAction({
            alert: { delete: false },
            confirm: { infoDeleteButton: false },
            modal: { editModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertDoubleButtonModal
        message={'카메라 정보를 수정하시겠습니까?'}
        isOpen={confirmPopup.infoEditButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            infoEditButton: false,
          }))
        }
        actionFunction={handleEditClick}
      />
      <AlertModal
        message={'카메라 정보가 수정되었습니다.'}
        isOpen={alertPopup.edit}
        onClose={() => {
          alertPopupCloseAction({
            alert: { edit: false },
            confirm: { infoEditButton: false },
            modal: { editModal: false },
          });
        }}
      />
      <AlertModal
        message={'수정에 실패했습니다.'}
        isOpen={wrongMessagePopup.edit}
        onClose={() => {
          alertPopupCloseAction({
            alert: { edit: false },
            confirm: { infoEditButton: false },
            modal: { editModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertDoubleButtonModal
        message={'카메라 정보를 등록하시겠습니까?'}
        isOpen={confirmPopup.infoRegisterButton}
        onClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            infoRegisterButton: false,
          }))
        }
        actionFunction={handleCameraRegisterClick}
      />
      <AlertModal
        message={'카메라 정보가 등록되었습니다.'}
        isOpen={alertPopup.register}
        onClose={() => {
          alertPopupCloseAction({
            alert: { register: false },
            confirm: { infoRegisterButton: false },
            modal: { registerModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertModal
        message={'등록 처리가 되지 않았습니다. 다시 확인해 주세요.'}
        isOpen={wrongMessagePopup.edit}
        onClose={() => {
          alertPopupCloseAction({
            alert: { register: false },
            confirm: { infoRegisterButton: false },
            modal: { registerModal: false },
          });
          setSelectedIndex(null);
        }}
      />
      <AlertModal
        message={
          <LoadingContainer>
            <Image width={60} height={60} src="/spinner.svg" alt="Loading" />
            <p>등록중입니다. 잠시만 기다려주세요!</p>
          </LoadingContainer>
        }
        isOpen={isLoading.register}
      />
      <AlertModal
        message={
          <LoadingContainer>
            <Image width={60} height={60} src="/spinner.svg" alt="Loading" />
            <p>삭제중입니다. 잠시만 기다려주세요!</p>
          </LoadingContainer>
        }
        isOpen={isLoading.delete}
      />
    </Container>
  );
};

const LoadingContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled('div')`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainerThree = styled('div')`
  width: 400px;
  display: flex;
  justify-content: space-evenly;
`;
const ButtonContainerTwo = styled('div')`
  width: 260px;
  display: flex;
  justify-content: space-evenly;
`;
