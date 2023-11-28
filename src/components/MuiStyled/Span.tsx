'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// export const SpanPrimaryMain = styled("span")`
//   color: ${(props) => props.theme.palette.primary.main};
// `;

export const LoginSpan = styled(Box)`
  color: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 3px 6px;
  font-size: 12px;
`;

export const CircleSpan = styled(Box)`
  width: 70px;
  color: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 3px 6px;
  font-size: 12px;
`;

export const CircleSpanActive = styled(CircleSpan)`
  background-color: #81c649;
`;
export const CircleSpanDisabled = styled(CircleSpan)`
  background-color: #ff9183;
`;
export const LoginSpanText = styled(LoginSpan)`
  font-weight: 200;
  font-size: 15px;
  color: ${(props) => props.theme.palette.primary.dark};
  margin: 10px;
`;

export const PasswordSpanText = styled(LoginSpan)`
  font-weight: 200;
  font-size: 15px;
  color: ${(props) => props.theme.palette.primary.dark};
  /* margin: 5px; */
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-right: 10px;
`;

export const Separator = styled('span')`
  display: inline-block;
  margin: 0 6px; // 좌우 여백을 추가하여 텍스트 필드와의 간격을 조절
  margin-top: 15px;
`;

export const SpanColorBox = styled('span')`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  color: #000;
  ${({ color }) => {
    return `background-color: ${color}`;
  }};
  text-indent: -9999px;
  overflow: hidden;
`;

export const SpanColorBoxL = styled('span')`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-inline: 6px 12px;
  color: #000;
  ${({ color }) => {
    return `background-color: ${color}`;
  }};
  text-indent: -9999px;
  overflow: hidden;
`;
