'use client';

import useSwrApiNew from '@/api';
import { FullScreenBox } from '@/components/MuiStyled/Box';
import { useEffect, useState } from 'react';
import AddDrawCanvas from 'src/utils/DrawCanvas/AddDrawCanvas/page';
import EditDrawCanvas from 'src/utils/DrawCanvas/EditDrawCanvas/page';
import ShowDrawCanvas from '@/utils/DrawCanvas/ShowDrawCanvas/page';
import {
  clickedCameraNumberState,
  modalOpenState,
  selectedIndexState,
  localAreaDataState,
  tokenState,
  LogoutTimeState,
} from '@/recoil/atoms';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import RtspVideoDetection from '@/components/RtspVideoDetection';
import {
  Close,
  CropFree,
  Pause,
  RestartAlt,
  Save,
  Search,
  Settings,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { SettingModal } from '@/components/Modal/SettingModal';
import {
  DivCanvasGlass,
  DivCanvasWrap,
  DivGlassView,
  DivIconsBox,
  DivScreenshotCanvas,
} from '@/components/MuiStyled/Div';
import { H2Title, H3Title } from '@/components/MuiStyled/Title';
import AsideDetectionAreaSetting from '@/components/CameraSettingSubMenu/DetectionAreaSetting/Aside';
import {
  handlePause,
  handleReset,
  handleSave,
  zoomDefault,
  zoomIn,
  zoomOut,
} from '@/utils/canvasMethods/canvasMethods';
import { renewToken } from '@/utils/auth';
import moment from 'moment';
import { mutate } from 'swr';

export const DetectionAreaSetting = () => {
  // drawMode 0 : No Draw (normal Mode)
  // drawMode 1 : Add Mode
  // drawMode 2 : Edit Mode
  const [drawMode, setDrawMode] = useState(0);
  const [addType, setAddType] = useState(null);
  const [addTypeColor, setAddTypeColor] = useState('');
  const [addDrawEnd, setAddDrawEnd] = useState<boolean>(false);
  const [areaData, setAreaData] = useRecoilState(localAreaDataState);
  const resetAreaData = useResetRecoilState(localAreaDataState);
  const [checked, setChecked] = useState([]);
  const [locked, setLocked] = useState([]);
  const [isHandleZoom, setIsHandleZoom] = useState(false);
  const CameraList = useRecoilValue(clickedCameraNumberState);
  const setSelectedIndex = useSetRecoilState(selectedIndexState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [userToken, setUserToken] = useRecoilState(tokenState);
  const setLogoutTime = useSetRecoilState(LogoutTimeState);
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      refreshToken();
    }, 540000);
    // }, 1000);
    return () => clearInterval(tokenInterval);
  }, []);
  useEffect(() => {
    setAddTypeColor(addTypeInfo.find((x) => x.code === addType)?.color);
  }, [addType]);
  useEffect(() => {
    console.log(areaData, 'setAreaData');
  }, [areaData]);

  const refreshToken = () => {
    (async () => {
      try {
        const newToken = await renewToken(localStorage.getItem('user_token'));
        setUserToken(newToken);
        localStorage.setItem('user_token', newToken);
        setLogoutTime(moment().add(600, 'seconds').format('YYYY-MM-DD h:mm:ss'));
      } catch (error) {
        console.error('Token renewal error:', error);
      }
    })();
  };
  const addTypeInfo = [
    // { code: 1, type: 'poly', color: '#c0f', name: '차량 검지 영역' },
    { code: 52, type: 'poly', color: '#f00', name: '객체 검출 영역' },
    { code: 53, type: 'poly', color: '#ff1', name: '배회 영역' },
    { code: 54, type: 'poly', color: '#0a0', name: '침입 영역' },
    { code: 55, type: 'poly', color: '#f90', name: '차량 트리거 영역' },
    { code: 56, type: 'line', color: '#00f', name: '진입 영역' },
    { code: 57, type: 'line', color: '#f55', name: '진출라인' },
  ];

  console.log(CameraList, 'CameraList');
  // API data (검지영역 데이터)를 호출
  const {
    data: result,
    isLoading,
    isError,
  } = useSwrApiNew('http://192.168.0.200:8080/query', {
    Command: 301,
    Channel: 1,
  });

  if (isLoading) {
    // API 호출, 로딩시
    return <div>Loading...</div>;
  } else if (isError) {
    // API 호출, 에러 발생시
    <div>Error. Plz Refresh.</div>;
  } else {
    // API 호출, 로드 완료시
    if (areaData !== result && areaData.Command) {
      console.log(result);
      // API data (검지영역 데이터)가 로컬 데이터와 다를 경우, 로컬 데이터에 받아온 API 데이터 세팅
      setAreaData(result);
      setChecked(result.ROIs.map((x) => x.ROICode));
    } else if (!areaData) {
      mutate('http://192.168.0.200:8080/query');
    } else {
      const areaCodes = areaData.ROIs.map((data) => data.ROICode);
      // API data 호출 -> 로컬 데이터 동기화 -> 해당 시점에서부터 각 캔버스 작업
      const closeModal = () => {
        resetAreaData();
        setSelectedIndex(0);
        setAddType(null);
      };
      const handleAddType = (event) => {
        setAddType(event.target.value);
        if (areaCodes.includes(event.target.value)) {
          setDrawMode(2);
          alert(
            '선택 영역 정보는 이미 추가 되어 있습니다. \n타입별 검지영역은 최대 1개 입니다.',
          );
        } else {
          setDrawMode(1);
          setAddTypeColor(event.target.color);
          setAddDrawEnd(false);
        }
      };

      const targetROI = areaData.ROIs.find((x) => x.ROICode == addType);
      let targetROIPoints;

      if (addType === 1) {
        targetROIPoints = targetROI?.VDAreas[0].Area.Points;
      } else {
        targetROIPoints = targetROI?.Areas[0].Area.Points;
      }
      const ShowCanvas = checked.map((item) => {
        const targetROI = areaData.ROIs.filter((x) => item === x.ROICode)[0];
        return (
          item !== addType && (
            <ShowDrawCanvas
              points={targetROI?.Areas[0].Area.Points}
              addTypeColor={addTypeInfo.find((x) => x.code === item).color}
              key={item}
            />
          )
        );
      });
      const CanvasGroup = () => {
        const addCanvasOption = {
          addType: addType,
          setAddType: setAddType,
          rois: areaData.ROIs,
          roiCode: addType,
          addTypeColor: addTypeColor,
          addDrawEnd: addDrawEnd,
          setAddDrawEnd: setAddDrawEnd,
          setDrawMode: setDrawMode,
          areaData: areaData,
          setAreaData: setAreaData,
          checked: checked,
          setChecked: setChecked,
        };
        const editCanvasOption = {
          roiCode: addType,
          targetPoints: targetROIPoints,
          addTypeColor: addTypeColor,
          isLocked: locked.includes(addType),
          areaData: areaData,
          setAreaData: setAreaData,
        };
        return (
          <>
            {drawMode === 1 ? (
              <AddDrawCanvas {...addCanvasOption} />
            ) : drawMode === 2 ? (
              <EditDrawCanvas {...editCanvasOption} />
            ) : null}
            {[...ShowCanvas]}
          </>
        );
      };

      const asideProps = {
        addTypeInfo: addTypeInfo,
        addType: addType,
        setAddType: setAddType,
        handleAddType: handleAddType,
        areaData: areaData,
        setAreaData: setAreaData,
        drawMode: drawMode,
        setDrawMode: setDrawMode,
        areaCodes: areaCodes,
        checked: checked,
        setChecked: setChecked,
        locked: locked,
        setLocked: setLocked,
      };

      const handleSettingClick = () => {
        setModalOpen((prevState) => ({ ...prevState, settingModal: true }));
      };
      const handleZoom = (e) => {
        const glass = document.getElementById('canvas_glass');
        const glassView = document.getElementById('glass_view');
        if (glass.style.display !== 'block') {
          glass.style.display = 'block';
        }
        glass.style.left = e.pageX - 320 - 100 / 2 + 'px';
        glass.style.top = e.pageY - 100 - 100 / 2 + 'px';
      };
      const handleZoomLeave = () => {
        document.getElementById('canvas_glass').style.display = 'none';
      };
      return (
        <FullScreenBox id="detection_area_wrap">
          <H2Title>카메라 검지영역 설정</H2Title>

          <AsideDetectionAreaSetting {...asideProps} />
          <div style={{ position: 'relative', width: '1440px', top: '-20px' }}>
            <H3Title>
              {drawMode ? (drawMode === 1 ? '추가' : '수정') : '기본'} 모드
              {addType
                ? ' [ ' + addTypeInfo.find((x) => x.code === addType)?.name + ' ] '
                : ''}
            </H3Title>

            <DivIconsBox>
              <Settings sx={{ fontSize: 30 }} onClick={handleSettingClick} />
              <Search
                sx={{ fontSize: 30 }}
                onClick={() => {
                  setIsHandleZoom(!isHandleZoom);
                }}
              />
              <ZoomIn sx={{ fontSize: 30 }} onClick={zoomIn} />
              <ZoomOut sx={{ fontSize: 30 }} onClick={zoomOut} />
              <CropFree sx={{ fontSize: 30 }} onClick={zoomDefault} />
              <Pause sx={{ fontSize: 30 }} onClick={handlePause} />
              <RestartAlt
                sx={{ fontSize: 30 }}
                onClick={() => {
                  handleReset(setDrawMode);
                  setAreaData(result);
                  setAddType(null);
                }}
              />
              <Save
                sx={{ fontSize: 30 }}
                onClick={() => {
                  setAddType(null);
                  handleSave(areaData, setDrawMode);
                }}
              />
              <Close
                sx={{ fontSize: 30, position: 'absolute', right: '0', top: '-50px' }}
                onClick={closeModal}
              />
            </DivIconsBox>
            <DivCanvasWrap
              id="canvas_wrap"
              onMouseMove={isHandleZoom ? handleZoom : null}
              onMouseLeave={handleZoomLeave}
            >
              <DivCanvasGlass id="canvas_glass">화면 확대 위치</DivCanvasGlass>
              <div
                id="canvas_zoom"
                style={{
                  transform: 'scale(1.0)',
                  background: 'transparent',
                  position: 'absolute',
                }}
              >
                <DivGlassView isHandleZoom={isHandleZoom} id="glass_view">
                  확대 화면
                </DivGlassView>
                <CanvasGroup />
                {/* 카메라 스틸컷 캔버스 */}
                <DivScreenshotCanvas id="screenshot"></DivScreenshotCanvas>
                {/* 카메라 캔버스 */}
                <RtspVideoDetection />
              </div>
            </DivCanvasWrap>
          </div>
          {modalOpen.settingModal ? <SettingModal /> : null}
        </FullScreenBox>
      );
    }
  }
};
