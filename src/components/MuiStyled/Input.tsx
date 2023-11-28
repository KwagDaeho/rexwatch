'use client';
import { styled } from '@mui/system';

export const InputPrimaryMain = styled('input')`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const InputForModule = styled(InputPrimaryMain)`
  width: 70%;
  padding: 5px 0;
  border-color: #e1dbdb;
`;
