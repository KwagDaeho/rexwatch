'use client';
import { MenuItem } from '@mui/material';
import { styled } from '@mui/system';
export const MenuItemPrimaryMain = styled(MenuItem)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const MenuItemForModule = styled(MenuItemPrimaryMain)``;
