/* eslint-disable react/jsx-key */
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { FlexColumnContainerUl } from '../MuiStyled/Ul';
import { useRecoilState } from 'recoil';
import {
  cameraCountState,
  cameraListDataState,
  cameraNameState,
  clickedCameraNumberState,
  modalOpenState,
} from '@/recoil/atoms';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useThemeToggle } from '@/utils/theme/CustomThemeProvider';
import { sendRequest } from '@/api/PostApi';

export const ToggleButtonList = () => {
  const { isDarkMode } = useThemeToggle();
  // const [cameraName, setCameraName] = useRecoilState(cameraNameState);
  const [clickedList, setClickedList] = useRecoilState(clickedCameraNumberState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [cameraName, setCameraName] = useRecoilState(cameraNameState);
  const [cameraListData, setCameraListData] = useRecoilState(cameraListDataState);
  const [cameraCount, setCameraCount] = useRecoilState(cameraCountState);
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setClickedList(newFormats);
  };

  const Element = cameraName?.map((element: any) => {
    return (
      <CustomToggleButton isDarkMode={isDarkMode} value={element}>
        <CameraAltIcon />
        {element.length > 10 ? (
          <>
            <Tooltip
              place="bottom"
              style={{ fontSize: '12px', zIndex: 10 }}
              anchorSelect="#textOver"
              content={`${element}`}
            />
            <TextOver id="textOver">{element}</TextOver>
          </>
        ) : (
          <P>{element}</P>
        )}
      </CustomToggleButton>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = { Command: 101 };
      const result = await sendRequest(data);
      const sortedData = result?.Cameras?.sort((a, b) => a.Channel - b.Channel);
      const camName = sortedData?.map((element) => {
        return element.Name;
      });
      setCameraListData(sortedData);
      setCameraName(camName);
      setCameraCount(result.CameraCount);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setClickedList([]);
    setModalOpen((prevState) => ({
      ...prevState,
      settingModal: false,
    }));
  }, []);
  return (
    <>
      <FlexColumnContainerUl>
        <ToggleButtonGroupStyled
          orientation="vertical"
          value={clickedList}
          onChange={handleFormat}
          // color="primary"
        >
          {Element}
        </ToggleButtonGroupStyled>
      </FlexColumnContainerUl>
    </>
  );
};

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  width: 80%;
`;

const ToggleButtonStyled = styled(ToggleButton)`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 5px;
  margin: 20px 0;
  border: none;
  width: 100%;
  height: 35px;
  color: ${(isDarkMode) => (isDarkMode ? '#000' : '#fff')};
  background-color: ${(isDarkMode) => (isDarkMode ? 'e0e0e0' : '#30A9DE')};
`;

const CustomToggleButton = styled(ToggleButtonStyled)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  '&.Mui-selected': {
    backgroundColor: '#30A9DE',
  },
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
}));

const P = styled('p')`
  margin-left: 10px;
  width: 100%;
`;
const TextOver = styled('p')`
  margin-left: 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
