'use client';

import useSwrApiNew from '@/api';
import { BoxSelectWrap, FullScreenBox } from '@/components/MuiStyled/Box';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddDrawCanvas from 'src/utils/DrawCanvas/AddDrawCanvas/page';
import EditDrawCanvas from 'src/utils/DrawCanvas/EditDrawCanvas/page';
import ShowDrawCanvas from '@/utils/DrawCanvas/ShowDrawCanvas/page';
import {
  clickedCameraNumberState,
  modalOpenState,
  selectedIndexState,
  localAreaDataState,
} from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import RtspVideoDetection from '@/components/RtspVideoDetection';
import {
  AddCircle,
  CheckBox,
  Close,
  CropFree,
  Delete,
  Edit,
  Lock,
  LockOpen,
  Pause,
  RestartAlt,
  Save,
  Search,
  Settings,
  Visibility,
  VisibilityOff,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useSWRConfig } from 'swr';
import { SettingModal } from '@/components/Modal/SettingModal';
import styled from '@emotion/styled';
import {
  DivCanvasGlass,
  DivCanvasWrap,
  DivGlassView,
  DivIconsBox,
  DivScreenshotCanvas,
} from '@/components/MuiStyled/Div';
import { AsideController } from '@/components/MuiStyled/Aside';
import { H2Title, H3Title } from '@/components/MuiStyled/Title';
import { ButtonToggle, DivtoggleText } from '@/components/MuiStyled/button';
import AsideDetectionAreaSetting from '@/components/CameraSettingSubMenu/DetectionAreaSetting/Aside';
import {
  handlePause,
  handleReset,
  handleSave,
  zoomDefault,
  zoomIn,
  zoomOut,
} from '@/utils/canvasMethods/canvasMethods';

const Test = () => {
  // drawMode 0 : No Draw (normal Mode)
  // drawMode 1 : Add Mode
  // drawMode 2 : Edit Mode
  const [drawMode, setDrawMode] = useState(0);
  const [addType, setAddType] = useState(null);
  const [addTypeColor, setAddTypeColor] = useState('');
  const [addDrawEnd, setAddDrawEnd] = useState<boolean>(false);
  const [areaData, setAreaData] = useRecoilState(localAreaDataState);
  const [checked, setChecked] = useState([]);
  const [locked, setLocked] = useState([]);
  const [isHandleZoom, setIsHandleZoom] = useState(false);
  const [CameraList, setCameraList] = useRecoilState(clickedCameraNumberState);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  useEffect(() => {
    setAddTypeColor(addTypeInfo.find((x) => x.code === addType)?.color);
  }, [addType]);
  useEffect(() => {
    // alert('에어리어 데이터 정보 변경..' + areaData.ROIs.length);
  }, [areaData]);

  const addTypeInfo = [
    // { code: 1, type: 'poly', color: '#c0f', name: '차량 검지 영역' },
    { code: 52, type: 'poly', color: '#f00', name: '객체 검출 영역' },
    { code: 53, type: 'poly', color: '#ff1', name: '배회 영역' },
    { code: 54, type: 'poly', color: '#0a0', name: '침입 영역' },
    { code: 55, type: 'poly', color: '#f90', name: '차량 트리거 영역' },
    { code: 56, type: 'line', color: '#00f', name: '진입 영역' },
    { code: 57, type: 'line', color: '#f55', name: '진출라인' },
  ];

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
    // 컴포넌트 로딩중
    return <div>Loading...</div>;
  } else if (isError) {
    // 컴포넌트 로드 에러 발생
    <div>Error. Plz Refresh.</div>;
  } else {
    // 컴포넌트 로드 완료
    if (areaData !== result && areaData.Command) {
      console.log(result);
      // API data (검지영역 데이터)가 로컬 데이터와 다를 경우, 로컬 데이터에 받아온 API 데이터 세팅
      setAreaData(result);
      setChecked(result.ROIs.map((x) => x.ROICode));
    } else {
      const areaCodes = areaData.ROIs.map((data) => data.ROICode);
      // API data 호출 -> 로컬 데이터 동기화 -> 여기에서 각 캔버스 작업
      const closeModal = () => {
        setSelectedIndex(0);
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

      const targetROI = areaData.ROIs.find(
        (x) => x.ROICode == addType /* ROICode */,
      );
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
      const handleEditPoints = () => {
        let editPoints = [];
        const setEditPoints = (points) => {
          editPoints = points;
        };
        return {
          set: function (newEditPoints) {
            setEditPoints(newEditPoints);
          },
          get: function () {
            return editPoints;
          },
        };
      };
      const myFunc = handleEditPoints();
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
        };
        const editCanvasOption = {
          roiCode: addType,
          targetPoints: targetROIPoints,
          addTypeColor: addTypeColor,
          handleEditPoints: handleEditPoints,
          isLocked: locked.includes(addType),
          areaData: areaData,
          setAreaData: setAreaData,
        };
        return (
          <>
            {drawMode === 1 ? (
              <AddDrawCanvas {...addCanvasOption} />
            ) : (
              <EditDrawCanvas {...editCanvasOption} />
            )}
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
        // console.log(e);
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
                }}
              />
              <Save
                sx={{ fontSize: 30 }}
                onClick={() => {
                  handleSave(areaData, setAreaData);
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

export default Test;
