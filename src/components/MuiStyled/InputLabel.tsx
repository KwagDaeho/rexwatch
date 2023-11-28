'use client';
import { InputLabel } from '@mui/material';
import { styled } from '@mui/system';
export const LabelPrimaryMain = styled(InputLabel)`
  color: ${(props) => props.theme.palette.primary.main};
`;
export const LabelPrimaryBlack = styled(InputLabel)`
  color: ${(props) => props.theme.palette.primary.dark};
`;

export const LabelForModule = styled(LabelPrimaryMain)``;

export const LabelForInput = styled(LabelPrimaryBlack)`
  font-size: 14px;
  margin-top: 30px;
  font-weight: 800;
`;
export const LabelForInputPassword = styled(LabelPrimaryBlack)`
  font-size: 14px;

  margin-top: 20px;
  /* font-weight: 800; */
`;
export const LabelForInputAddUser = styled(LabelPrimaryBlack)`
  font-size: 14px;
  margin-top: 20px;
  font-weight: 400;
  margin-left: 70px;
  text-align: center;
`;
export const LabelForInputAddIP = styled(LabelPrimaryBlack)`
  font-size: 14px;
  margin-top: 30px;
  font-weight: 400;
  margin-left: 100px;
  text-align: right;
`;
