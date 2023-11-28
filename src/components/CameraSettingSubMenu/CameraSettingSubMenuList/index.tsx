'use client';
import { cameraSettingSubMenuListData } from '@/data/cameraData';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cameraListDataState,
  selectedIndexState,
  selectedSettingChannelState,
} from '@/recoil/atoms';
import styled from '@emotion/styled';

export const CameraSettingSubMenuList = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
  const [cameraListData, setCameraListData] = useRecoilState(cameraListDataState);

  const selectedSettingChannel = useRecoilValue(selectedSettingChannelState);
  const menuList = cameraSettingSubMenuListData.map((element, index) => {
    return (
      <>
        <CustomToggleButton
          onClick={() => setSelectedIndex(index)}
          selected={index === selectedIndex}
        >
          <ListItemTextStyled>
            <P>{element}</P>
          </ListItemTextStyled>
        </CustomToggleButton>
      </>
    );
  });

  return (
    <ListStyled disablePadding>
      {menuList}
      {cameraListData && (
        <CustomToggleButton
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.open(
                `http://${cameraListData[selectedSettingChannel].IP}`,
                '_blank',
              );
            }
          }}
        >
          <ListItemTextStyled>
            <P>웹 페이지 연결</P>
          </ListItemTextStyled>
        </CustomToggleButton>
      )}
    </ListStyled>
  );
};

const ListStyled = styled(List)`
  padding: 10px 0;
`;
const ListItemButtonStyled = styled(ListItemButton)`
  margin: 4px 20px;
  border: 1px solid #aeaeae;
  border-radius: 5px;
  :focus {
    background-color: #30a9de;
  }
`;
const CustomToggleButton = styled(ListItemButtonStyled)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  border: 'none',
  '&.Mui-selected': {
    backgroundColor: '#30A9DE',
  },
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
}));
const ListItemTextStyled = styled(ListItemText)``;
const P = styled('p')`
  font-size: 12px;
`;
