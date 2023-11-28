'use client';

import { styled } from '@mui/system';

export const Div = styled('div')``;

export const FlexContainer = styled(Div)`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

export const ContainerForModule = styled(Div)``;

export const CameraListContainer = styled(Div)`
  border: 1px solid;
  min-height: 200px;
`;

export const ModuleSubMenuContainer = styled(Div)`
  width: 100%;
  padding: 20px 10px;
  min-height: 315px;
  border-top: 1px solid #c3c3c3;
`;

export const LoginFormContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center; // align items horizontally in the center
  justify-content: center; // align items vertically in the center
  width: 500px; // adjust this as needed
`;

export const HeaderContainer = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainHeaderContainer = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-left: 100px; */
  text-align: 'left';
  margin-top: 20px;
`;

export const MainHeaderContainerTitle = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: flex-start; // 왼쪽 정렬
  /* margin-left: 100px; */
  text-align: left; // 이 부분은 필요 없으므로 제거 가능
  margin-top: 19px;
  /* margin-left: 80px; */
`;

export const DoubleButtonContainer = styled(Div)`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  /* margin-left: 100px; */
`;

export const DoubleButtonContainer2 = styled(Div)`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  width: 85%;
  /* margin-left: 100px; */
`;
export const ChangePasswordContainer = styled(Div)`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  width: 90%;
  margin-left: 20px;
`;

export const Item = styled(Div)`
  margin: 0 5px; // Adjust this value as needed
`;

export const CapchaContainer = styled(Div)`
  display: flex;
  margin: 1;
  align-items: center;
  justify-content: center;
`;

export const ItemWithIcon = styled(Item)`
  width: 100%;
  display: flex;
  align-items: center; // 아이콘과 텍스트 필드를 수직으로 중앙에 정렬합니다.
`;

export const TableContainer = styled(Div)`
  /* display: flex; */
  /* align-items: center; */
  justify-content: center;
  /* width: 100vw; */
  /* margin-left: 100px; */
`;

export const DivCanvasWrap = styled('div')`
  width: 1442px;
  height: 812px;
  overflow: scroll;
  border: 1px solid #000;
  position: relative;
`;
interface DivGlassViewProps {
  isHandleZoom: boolean;
}
export const DivGlassView = styled('div')<DivGlassViewProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  display: ${(props) => (props.isHandleZoom ? 'block' : 'none')};
  width: calc(100px * 2);
  height: calc(100px * 2);
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.5);
  text-indent: 9999px;
  overflow: hidden;
`;
export const DivCanvasGlass = styled('div')`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  display: none;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  text-indent: -9999px;
  overflow: hidden;
`;
export const DivScreenshotCanvas = styled('div')`
  width: 1440px;
  height: 810px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: transparent;
`;

export const DivIconsBox = styled('div')`
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  justify-content: right;
  gap: 8px;
  margin-bottom: 10px;
  ${'svg'} {
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
      border-color: #0650a4;
    }
  }
`;
