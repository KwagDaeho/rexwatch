import { InputLabel, TextField } from '@mui/material';
import { TypographySubTitle } from '../MuiStyled/Typography';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { moduleVersionErrorState } from '@/recoil/atoms';
import { useState } from 'react';

export const ProgramInfo = ({ initialData, dataChangeHandler }) => {
  const [versionError, setVersionError] = useRecoilState(moduleVersionErrorState);
  const [disabled, setDisabled] = useState(true);
  return (
    <ModuleSubMenuContainer>
      <TypographySubTitle variant="h6">프로그램 정보</TypographySubTitle>
      <InputContainer>
        <Label>버전</Label>
        <Input
          size="small"
          defaultValue={initialData?.XavierVersion}
          error={versionError}
          focused={versionError}
          // inputRef={inputRefs.RtspPort}
          onChange={dataChangeHandler}
          helperText={versionError ? '' : ''}
          type="input"
          name="XavierVersion"
          disabled={disabled}
          style={
            disabled && { backgroundColor: '#ededed', border: 'none', padding: 0 }
          }
        />
      </InputContainer>
    </ModuleSubMenuContainer>
  );
};
const ModuleSubMenuContainer = styled('div')`
  width: 100%;
  padding: 20px 10px;
  min-height: 300px;
  border-top: 1px solid #c3c3c3;
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
