'use client';
import { InputBase, Select } from '@mui/material';
import { styled } from '@mui/system';

export const SelectPrimaryMain = styled('select')`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const SelectForModule = styled(SelectPrimaryMain)``;

export const CustomInput = styled(InputBase)`
  border: none !important; // !important를 사용해 다른 스타일을 덮어쓰기

  &:focus {
    border: none !important;
  }
`;

export const SelectIPOrMAC = styled(Select)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 14px;
  padding: 4px 8px;
  height: 30px;
  margin-top: 25px;

  & .MuiSelect-select {
    padding: 0;
  }

  & .MuiSvgIcon-root {
    font-size: 18px;
  }
`;
