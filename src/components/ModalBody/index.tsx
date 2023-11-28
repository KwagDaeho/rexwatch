/* eslint-disable react-hooks/exhaustive-deps */
import {
  cameraIdErrorState,
  cameraNameErrorState,
  clickedItemDataState,
  ipErrorState,
  licenseKeyErrorState,
  modalOpenState,
  notChangedMessageState,
  rtspIdErrorState,
  rtspPortErrorState,
  rtspPwErrorState,
  rtspUriErrorState,
  settingModalDataState,
} from '@/recoil/atoms';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { checkboxData } from '@/data/cameraData';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
} from '@mui/material';
import { ClickButton } from '../ClickButton';
import { useEffect, useRef, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PropsType {}

export const ModalBody = (props: PropsType) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [clickedItemData, setClickedItemData] = useRecoilState(clickedItemDataState);
  const [OSD, setOSD] = useRecoilState(settingModalDataState);
  const [passwordVisible, setPasswordVisible] = useState(true);
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

  const cameraIdRef = useRef(null);
  const ipRef = useRef(null);
  const licenseKeyRef = useRef(null);
  const cameraNameRef = useRef(null);
  const rtspIdRef = useRef(null);
  const rtspPwRef = useRef(null);
  const rtspPortRef = useRef(null);
  const rtspUriRef = useRef(null);

  const inputRefs = {
    CameraID: cameraIdRef,
    IP: ipRef,
    LicenseKey: licenseKeyRef,
    Name: cameraNameRef,
    RtspID: rtspIdRef,
    RtspPW: rtspPwRef,
    RtspPort: rtspPortRef,
    RtspUri: rtspUriRef,
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dataChangeHandler = (e) => {
    setClickedItemData({ ...clickedItemData, [e.target.name]: e.target.value });
  };

  // const RegisterChangeHandler = (e) => {
  //   setClickedItemData({ ...clickedItemData, [e.target.name]: e.target.value });
  // };

  const CameraOSDChangeHandler = (e) => {
    setOSD({
      ...OSD,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
  };

  const toggleAllCheckboxes = () => {
    const allChecked = Object.values(OSD).every((value) => value === 1);
    setOSD({
      DateTimeVisible: allChecked ? 0 : 1,
      DetectAreaVisible: allChecked ? 0 : 1,
      ObjectAreaVisible: allChecked ? 0 : 1,
      ObjectIdVisible: allChecked ? 0 : 1,
      ObjectScoreVisible: allChecked ? 0 : 1,
      ObjectSpeedVisible: allChecked ? 0 : 1,
    });
  };

  const CaseModalReturn = () => {
    return (
      <>
        {modalOpen.editModal && (
          <>
            <InputContainer>
              <Label>카메라 아이디</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.CameraID}
                error={cameraIdError}
                focused={cameraIdError}
                inputRef={inputRefs.CameraID}
                onChange={dataChangeHandler}
                type="input"
                name="CameraID"
              />
            </InputContainer>
            <InputContainer>
              <Label>카메라 이름</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.Name}
                error={cameraNameError}
                focused={cameraNameError}
                inputRef={inputRefs.Name}
                onChange={dataChangeHandler}
                type="input"
                name="Name"
              />
            </InputContainer>
            <InputContainer>
              <Label>카메라 아이피</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.IP}
                error={ipError}
                focused={ipError}
                inputRef={inputRefs.IP}
                onChange={dataChangeHandler}
                type="input"
                name="IP"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 포트</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.RtspPort}
                error={rtspPortError}
                focused={rtspPortError}
                inputRef={inputRefs.RtspPort}
                onChange={dataChangeHandler}
                type="input"
                name="RtspPort"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 아이디</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.RtspID}
                error={rtspIdError}
                focused={rtspIdError}
                inputRef={inputRefs.RtspID}
                onChange={dataChangeHandler}
                type="input"
                name="RtspID"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 비밀번호</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.RtspPW}
                error={rtspPwError}
                focused={rtspPwError}
                inputRef={inputRefs.RtspPW}
                onChange={dataChangeHandler}
                type={passwordVisible ? 'password' : 'text'}
                name="RtspPW"
              />
              <VisibleToggleButton type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </VisibleToggleButton>
            </InputContainer>
            <InputContainer>
              <Label>RTSP URI</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.RtspUri}
                error={rtspUriError}
                focused={rtspUriError}
                inputRef={inputRefs.RtspUri}
                onChange={dataChangeHandler}
                type="input"
                name="RtspUri"
              />
            </InputContainer>
            <InputContainer>
              <Label>라이센스</Label>
              <Input
                size="small"
                defaultValue={clickedItemData.LicenseKey}
                error={licenseKeyError}
                focused={licenseKeyError}
                inputRef={inputRefs.LicenseKey}
                onChange={dataChangeHandler}
                type="input"
                name="LicenseKey"
              />
            </InputContainer>
            <ErrorMessage>
              {notChangedMessage
                ? '변경된 내용이 없습니다'
                : cameraIdError
                ? '영문 소/대문자, 숫자를 사용하여 1~10자리로 입력하세요.'
                : cameraNameError
                ? '카메라 이름은 32자리 이하의 영문 소/대문자, 한글, 숫자만 입력이 가능합니다.'
                : ipError
                ? 'IP 주소 형식이 올바르지 않거나 16자리를 초과했습니다.'
                : rtspPortError
                ? '0~65535 사이의 숫자만 입력이 가능합니다.'
                : rtspIdError
                ? '영문 소/대문자, 숫자를 사용하며, 길이는 1~32자리 사이어야 합니다.'
                : rtspPwError
                ? '영문 소/대문자, 숫자, 특수문자만 사용하여 1~32자리로 입력하세요.'
                : rtspUriError
                ? '영문 소/대문자, 숫자, 특수문자를 사용 할 수 있으며 1자 이상 32자 이하 입니다. '
                : licenseKeyError
                ? '영문 소/대문자, 숫자를 사용하여 16자리로 입력하세요.'
                : ''}
            </ErrorMessage>
          </>
        )}
        {modalOpen.registerModal && (
          <>
            <InputContainer>
              <Label>카메라 아이디</Label>
              <Input
                size="small"
                error={cameraIdError}
                focused={cameraIdError}
                inputRef={inputRefs.CameraID}
                onChange={dataChangeHandler}
                type="input"
                name="CameraID"
              />
            </InputContainer>
            <InputContainer>
              <Label>카메라 이름</Label>
              <Input
                size="small"
                error={cameraNameError}
                focused={cameraNameError}
                inputRef={inputRefs.Name}
                onChange={dataChangeHandler}
                type="input"
                name="Name"
              />
            </InputContainer>
            <InputContainer>
              <Label>카메라 아이피</Label>
              <Input
                size="small"
                error={ipError}
                focused={ipError}
                inputRef={inputRefs.IP}
                onChange={dataChangeHandler}
                type="input"
                name="IP"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 포트</Label>
              <Input
                size="small"
                error={rtspPortError}
                focused={rtspPortError}
                inputRef={inputRefs.RtspPort}
                onChange={dataChangeHandler}
                type="input"
                name="RtspPort"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 아이디</Label>
              <Input
                size="small"
                error={rtspIdError}
                focused={rtspIdError}
                inputRef={inputRefs.RtspID}
                onChange={dataChangeHandler}
                type="input"
                name="RtspID"
              />
            </InputContainer>
            <InputContainer>
              <Label>RTSP 비밀번호</Label>
              <Input
                size="small"
                error={rtspPwError}
                focused={rtspPwError}
                inputRef={inputRefs.RtspPW}
                onChange={dataChangeHandler}
                type={passwordVisible ? 'password' : 'text'}
                name="RtspPW"
              />
              <VisibleToggleButton type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </VisibleToggleButton>
            </InputContainer>
            <InputContainer>
              <Label>RTSP URI</Label>
              <Input
                size="small"
                error={rtspUriError}
                focused={rtspUriError}
                inputRef={inputRefs.RtspUri}
                onChange={dataChangeHandler}
                type="input"
                name="RtspUri"
              />
            </InputContainer>
            <InputContainer>
              <Label>라이센스</Label>
              <Input
                size="small"
                error={licenseKeyError}
                focused={licenseKeyError}
                inputRef={inputRefs.LicenseKey}
                onChange={dataChangeHandler}
                type="input"
                name="LicenseKey"
              />
            </InputContainer>
            <ErrorMessage>
              {notChangedMessage
                ? '변경된 내용이 없습니다'
                : cameraIdError
                ? '영문 소/대문자, 숫자를 사용하여 1~10자리로 입력하세요.'
                : cameraNameError
                ? '카메라 이름은 32자리 이하의 영문 소/대문자, 한글, 숫자만 입력이 가능합니다.'
                : ipError
                ? 'IP 주소 형식이 올바르지 않거나 16자리를 초과했습니다.'
                : rtspPortError
                ? '0~65535 사이의 숫자만 입력이 가능합니다.'
                : rtspIdError
                ? '영문 소/대문자, 숫자를 사용하며, 길이는 1~32자리 사이어야 합니다.'
                : rtspPwError
                ? '영문 소/대문자, 숫자, 특수문자만 사용하여 1~32자리로 입력하세요.'
                : rtspUriError
                ? '영문 소/대문자, 숫자, 특수문자를 사용 할 수 있으며 1자 이상 32자 이하 입니다. '
                : licenseKeyError
                ? '영문 소/대문자, 숫자를 사용하여 16자리로 입력하세요.'
                : ''}
            </ErrorMessage>
          </>
        )}
        {modalOpen.settingModal && (
          <>
            <ButtonContainer>
              <ClickButton
                minwidth="60px"
                title={'전체선택'}
                onClick={toggleAllCheckboxes}
              />
            </ButtonContainer>
            {OSD && (
              <>
                <FormGroupStyled>
                  {checkboxData.map(({ name, label }) => (
                    <FormControlLabelStyled
                      key={name}
                      control={
                        <Checkbox
                          name={name}
                          checked={OSD[name]}
                          onChange={CameraOSDChangeHandler}
                        />
                      }
                      label={label}
                    />
                  ))}
                </FormGroupStyled>
              </>
            )}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    setNotChangedMessage(false);
    setCameraIdError(false);
    setIpError(false);
    setLicenseKeyError(false);
    setCameraNameError(false);
    setRtspIdError(false);
    setRtspPwError(false);
    setRtspPortError(false);
    setRtspUriError(false);
  }, []);

  useEffect(() => {
    if (modalOpen.editModal || modalOpen.registerModal) {
      // checkInputErrors();
    }
  }, [modalOpen.editModal, modalOpen.registerModal]);

  return (
    <Container>
      <List>{CaseModalReturn()}</List>
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  padding: 30px 0;
`;
const List = styled('ul')`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Li = styled('li')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const FormGroupStyled = styled(FormGroup)`
  width: 210px;
  margin: 0 auto;
`;
const FormControlLabelStyled = styled(FormControlLabel)`
  display: flex;
  justify-content: left;
`;

const ButtonContainer = styled('div')`
  padding: 15px 0;
  width: 30%;
`;
const InputContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 0;
  width: 100%;
  height: 60px;
`;
const Label = styled(InputLabel)`
  display: flex;
  font-size: 14px;
  align-items: center;
  width: 25%;
  height: 20px;
`;
const Input = styled(TextField)`
  color: ${(props) => props.theme.palette.primary.main};
  width: 70%;
  padding: 12px 5px;
  border-radius: 5px;
  border-color: '#e1dbdb';
`;

const VisibleToggleButton = styled('button')`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled('p')`
  color: red;
  font-size: 12px;
`;
