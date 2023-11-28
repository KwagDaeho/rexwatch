'use client';
import { styled } from '@mui/system';

export const PPrimaryMain = styled('p')`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const PForModule = styled(PPrimaryMain)`
  width: 20%;
`;
