'use client';
import { ListItem } from '@mui/material';
import { styled } from '@mui/system';
export const ListItemPrimaryMain = styled(ListItem)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const ListItemForModule = styled(ListItemPrimaryMain)``;
