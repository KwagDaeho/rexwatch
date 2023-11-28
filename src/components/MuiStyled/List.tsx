'use client';
import { List } from '@mui/material';
import { styled } from '@mui/system';
export const ListPrimaryMain = styled(List)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const ListForModule = styled(ListPrimaryMain)``;
