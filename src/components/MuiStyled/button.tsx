'use client';
import { Button, ButtonProps, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';

type StyledButtonProps = ButtonProps & {
  active?: boolean;
};

export const ButtonMain = styled(Button)``;

export const IconInButton = styled(ButtonMain)`
  /* width: 30px; */
  /* height: 30px; */
  &:hover {
    background-color: transparent !important; // 배경색 제거
    opacity: 1 !important; // 아이콘의 투명도 변화 제거
  }
`;

export const UlButton = styled(ButtonMain)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ButtonCommon = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid; */
`;
export const LoginButton = styled(Button)`
  margin: 20px 0; // 상하로 여백 추가
  width: 500px;
  height: 60px;
`;

export const DoubleButton = styled(Button)`
  margin: 20px 0; // 상하로 여백 추가

  width: 250px;
  height: 40px;
`;
export const DoubleButton2 = styled(Button)`
  margin: 20px 0; // 상하로 여백 추가

  width: 100px;
  height: 40px;
  border-radius: 0 !important;
`;
export const MiniButton = styled(Button)`
  margin: 20px 0; // 상하로 여백 추가

  width: 50px;
  height: 40px;
  border-radius: 0;
`;
export const StyledButton = styled(Button)<StyledButtonProps>`
  margin: 20px 0;
  width: 250px;
  height: 40px;
  background-color: ${
    (props) => (props.active ? '#7092BE' : '#e0e0e0') // 조건부 배경색 설정
  };
  border-radius: 0;

  opacity: ${(props) => (props.active ? '1' : '0.5')};
  justify-content: center;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette.primary.dark};
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
  &:active {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`;

const toggleStyle = `width: 30px;
  min-width: 30px;
  margin-left: 0;
  padding: 0;
  border: 0;
  border-right: 1px solid #999;
  border-radius: 0;
  background: transparent !important;`;
export const ButtonToggle = styled(ToggleButton)`
  ${toggleStyle}
`;
export const DivtoggleText = styled('div')`
  ${toggleStyle}
  font-size: 14px;
  text-align: center;
  &:last-of-type {
    border-right: 0;
  }
`;

interface DetectionAreaAsideToogleProps {
  isTarget: boolean;
}
export const DetectionAreaAsideToogle = styled(
  ToggleButton,
)<DetectionAreaAsideToogleProps>`
  flex-wrap: wrap;
  background-color: ${(props) =>
    props.isTarget ? '#aaa' : 'transparent'} !important;
  border: 1px solid #aaa;
  border-color: ${(props) => (props.isTarget ? '#0650A4' : '0')} !important;
  border-radius: 0;
  padding: 0;
  > ${'div'} {
    background-color: ${(props) => props.isTarget && 'inherit'};
  }
`;
