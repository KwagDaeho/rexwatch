'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
export const BoxPrimaryMain = styled(Box)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const ContainerForModule = styled(BoxPrimaryMain)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
`;

export const FullScreenBox = styled(Box)`
  z-index: 1200;
  position: fixed;
  left: 0;
  top: 50px;
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 0 40px;
  background-color: #fff;
`;

export const BoxSelectWrap = styled(Box)`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;
