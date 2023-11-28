import { TypographySubTitle } from '../MuiStyled/Typography';
import { ModuleSubMenuContainer } from '../MuiStyled/Div';
import styled from '@emotion/styled';
import { InputLabel, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { moduleRtspUriErrorState, moduleWebRTCUriErrorState } from '@/recoil/atoms';
import { useState } from 'react';

export const StreamingInfo = ({ initialData, dataChangeHandler }) => {
  const [rtspUriError, setRtspUriError] = useRecoilState(moduleRtspUriErrorState);
  const [webRTCError, setWebRTCError] = useRecoilState(moduleWebRTCUriErrorState);
  const [disabled, setDisabled] = useState(true);
  return (
    <ModuleSubMenuContainer>
      <TypographySubTitle variant="h6">스트리밍 정보</TypographySubTitle>
      <InputContainer>
        <Label>Rtsp Uri</Label>
        <Input
          size="small"
          defaultValue={initialData?.RTSP_Uri}
          error={rtspUriError}
          focused={rtspUriError}
          onChange={dataChangeHandler}
          helperText={rtspUriError ? '.' : ''}
          type="input"
          name="RTSP_Uri"
          disabled={disabled}
          style={
            disabled && { backgroundColor: '#ededed', border: 'none', padding: 0 }
          }
        />
      </InputContainer>
      <InputContainer>
        <Label>Web RTC Uri</Label>
        <Input
          size="small"
          defaultValue={initialData?.WebRTC_Uri}
          error={webRTCError}
          focused={webRTCError}
          helperText={webRTCError ? '' : ''}
          onChange={dataChangeHandler}
          type="input"
          name="WebRTC_Uri"
          disabled={disabled}
          style={
            disabled && { backgroundColor: '#ededed', border: 'none', padding: 0 }
          }
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
