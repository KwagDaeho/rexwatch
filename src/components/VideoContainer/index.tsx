/* eslint-disable react/jsx-key */
import { useRecoilState } from 'recoil';
import {
  cameraListDataState,
  clickedCameraNumberState,
  lastAddedCameraNumberState,
  modalOpenState,
} from '@/recoil/atoms';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { ClickButton } from '../ClickButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingModal } from '../Modal/SettingModal';
import RtspVideo from '../RtspVideo';
import { Tooltip } from 'react-tooltip';

export const VideoContainer = () => {
  const [clickedList, setClickedList] = useRecoilState(clickedCameraNumberState);
  const [videoList, setVideoList] = useState([]);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [cameraListData, setCameraListData] = useRecoilState(cameraListDataState);
  const [lastCameraNumber, setLastCameraNumber] = useRecoilState(
    lastAddedCameraNumberState,
  );
  const handleSettingClick = () => {
    setModalOpen((prevState) => ({ ...prevState, settingModal: true }));
  };

  const imageUrl = 'cameraBackgroundImage.png';

  useEffect(() => {
    if (clickedList.length > 0) {
      const recentItem = clickedList[clickedList.length - 1];
      setLastCameraNumber(recentItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedList]);

  return (
    <>
      <Container>
        <Title>
          <p>영상 보기</p>
          <Tooltip
            place="bottom"
            style={{ fontSize: '12px', zIndex: 10 }}
            anchorSelect="#cameraOSD"
            content="카메라 OSD 설정"
          />
          <ClickButton
            id="cameraOSD"
            onClick={handleSettingClick}
            title={<SettingsIcon />}
          />
        </Title>
        <VideoArticle>
          <GridContent
            style={{ backgroundImage: `url(${imageUrl})`, top: 0, left: 0 }}
          />
          <GridContent
            style={{ backgroundImage: `url(${imageUrl})`, top: 0, left: '50%' }}
          />
          <GridContent
            style={{ backgroundImage: `url(${imageUrl})`, top: '50%', left: 0 }}
          />
          <GridContent
            style={{ backgroundImage: `url(${imageUrl})`, top: '50%', left: '50%' }}
          />
          <RtspVideo />
        </VideoArticle>
      </Container>
      {modalOpen.settingModal ? <SettingModal /> : null}
    </>
  );
};

const Container = styled('div')`
  width: 100%;
  height: 100vh;
`;

const Title = styled('h2')`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 5px;
`;
const VideoArticle = styled('div')`
  width: 90%;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #c3c3c3;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    width: 100%;
    height: 1px; // 가로선 높이
    background-color: #c3c3c3;
    top: 50%;
    z-index: 1;
  }

  &::after {
    height: 100%;
    width: 1px; // 세로선 너비
    background-color: #c3c3c3;
    left: 50%;
  }
`;

const GridContent = styled('div')`
  width: 50%;
  height: 50%;
  position: absolute;
  background-size: cover;
  background-position: center;
`;
