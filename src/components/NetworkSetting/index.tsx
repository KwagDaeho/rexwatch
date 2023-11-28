import { TypographySubTitle } from '../MuiStyled/Typography';
import { ModuleSubMenuContainer } from '../MuiStyled/Div';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import {
  moduleBoardNumErrorState,
  moduleGatwayErrorState,
  moduleIpAddressErrorState,
  moduleMacNumberErrorState,
  moduleSubnetMaskErrorState,
} from '@/recoil/atoms';
import { InputLabel, TextField } from '@mui/material';
import { useState } from 'react';

export const NetworkSetting = ({ initialData, dataChangeHandler }) => {
  // const data = networkData;
  const [BoardNumError, setBoardNumError] = useRecoilState(moduleBoardNumErrorState);
  const [macNumberError, setMacNumberError] = useRecoilState(
    moduleMacNumberErrorState,
  );
  const [ipAddressError, setIpAddressError] = useRecoilState(
    moduleIpAddressErrorState,
  );
  const [subnetMaskError, setSubnetMaskError] = useRecoilState(
    moduleSubnetMaskErrorState,
  );
  const [gatwayError, setGatwayError] = useRecoilState(moduleGatwayErrorState);
  const [disabled, setDisabled] = useState(true);
  return (
    <ModuleSubMenuContainer>
      <TypographySubTitle variant="h6">네트워크 설정</TypographySubTitle>
      <InputContainer>
        <Label>보드 번호</Label>
        <Input
          size="small"
          defaultValue={initialData?.BoardNum}
          error={BoardNumError}
          focused={BoardNumError}
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          helperText={BoardNumError ? '0~999 사이의 숫자만 입력가능합니다.' : ''}
          type="input"
          name="BoardNum"
        />
      </InputContainer>
      <InputContainer>
        <Label>MAC</Label>
        <Input
          size="small"
          defaultValue={initialData?.MAC}
          error={macNumberError}
          focused={macNumberError}
          helperText={macNumberError ? '' : ''}
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          type="input"
          name="MAC"
          disabled={disabled}
          style={
            disabled && { backgroundColor: '#ededed', border: 'none', padding: 0 }
          }
        />
      </InputContainer>
      <InputContainer>
        <Label>IP 주소</Label>
        <Input
          size="small"
          defaultValue={initialData?.IP}
          error={ipAddressError}
          focused={ipAddressError}
          helperText={
            ipAddressError
              ? 'IP 주소 형식이 올바르지 않거나 16자리를 초과했습니다.'
              : ''
          }
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          type="input"
          name="IP"
        />
      </InputContainer>
      <InputContainer>
        <Label>서브넷 마스크</Label>
        <Input
          size="small"
          defaultValue={initialData?.SubnetMask}
          error={subnetMaskError}
          focused={subnetMaskError}
          helperText={
            subnetMaskError
              ? '서브넷 마스크 형식이 올바르지 않거나 16자리를 초과했습니다.'
              : ''
          }
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          type="input"
          name="SubnetMask"
        />
      </InputContainer>
      <InputContainer>
        <Label>게이트 웨이</Label>
        <Input
          size="small"
          defaultValue={initialData?.GateWay}
          error={gatwayError}
          focused={gatwayError}
          helperText={
            gatwayError
              ? '게이트 웨이 형식이 올바르지 않거나 16자리를 초과했습니다.'
              : ''
          }
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          type="input"
          name="GateWay"
        />
      </InputContainer>
    </ModuleSubMenuContainer>
  );
};
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
