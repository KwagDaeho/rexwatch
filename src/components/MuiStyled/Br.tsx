'use client';

import { styled } from '@mui/system';

export const BrContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw; // adjust this as needed
`;

export const VerticalLine = styled('hr')`
  color: #cccccc;
  height: 100%; // adjust this as needed
  width: 500px; // adjust this as needed
`;

export const MainLine = styled('hr')`
  height: 90%; // adjust this as needed
  width: 100%; // adjust this as needed
  color: ${(props) => props.theme.palette.primary.dark};
`;

export const MainLineHr = styled('hr')`
  width: 90%;
  border: none; // 기존 border를 제거
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.dark}; // 라인의 높이와 색상을 정의
  margin: auto; // 가운데 정렬
  margin-bottom: 20px;
`;
export const MiniModalLineHr = styled('hr')`
  width: 90%;
  border: none; // 기존 border를 제거
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.dark}; // 라인의 높이와 색상을 정의
  margin: auto; // 가운데 정렬
  margin-bottom: 10px;
`;
