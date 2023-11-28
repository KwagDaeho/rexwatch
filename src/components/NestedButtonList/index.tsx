import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { FlexColumnContainerUl } from '../MuiStyled/Ul';
import { useEffect, useState } from 'react';
import { CameraSettingSubMenuList } from '../CameraSettingSubMenu/CameraSettingSubMenuList';
import { useRecoilState } from 'recoil';
import {
  cameraListDataState,
  cameraNameState,
  clickedCameraNumberState,
  selectedSettingChannelState,
} from '@/recoil/atoms';
import { sendRequest } from '@/api/PostApi';
import { Tooltip } from 'react-tooltip';

export const NestedButtonList = () => {
  const [cameraName, setCameraName] = useRecoilState(cameraNameState);
  const [cameraListData, setCameraListData] = useRecoilState(cameraListDataState);
  const [openStates, setOpenStates] = useState(0);
  const [selectedSettingChannel, setSelectedSettingChannel] = useRecoilState(
    selectedSettingChannelState,
  );
  const [cameraList, setCameraList] = useRecoilState(clickedCameraNumberState);

  useEffect(() => {
    if (cameraName) {
      setOpenStates(
        cameraName?.reduce((acc, _, index) => {
          acc[index] = index === 0;
          return acc;
        }, {}),
      );
    }
  }, [cameraName]);

  useEffect(() => {
    const fetchData = async () => {
      const data = { Command: 101 };
      const result = await sendRequest(data);
      const sortedData = result?.Cameras?.sort((a, b) => a.Channel - b.Channel);
      const camName = sortedData?.map((element) => {
        return element.Name;
      });

      setCameraListData(sortedData);
      // setCameraName(camName);

      // console.log(camName, 'camName');
      // setCameraList([camName[0]]);
      // setSelectedSettingChannel(0);
      // setCameraCount(result.CameraCount);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 하나 빼고 다 닫히기
  const handleClick = (index: number) => {
    setCameraList([cameraName[index]]);
    setSelectedSettingChannel(index);
    setOpenStates((prevStates) => {
      const newStates = Object.keys(prevStates).reduce((acc, key) => {
        acc[parseInt(key)] = index === parseInt(key);
        return acc;
      }, {});
      return newStates;
    });
  };

  if (!cameraList.length) {
    handleClick(0);
  }

  return (
    <>
      <FlexColumnContainerUl>
        {cameraName?.map((element: any, index: number) => {
          return (
            <>
              {element.length > 10 ? (
                <>
                  <Tooltip
                    place="bottom"
                    style={{ zIndex: 10 }}
                    anchorSelect="#listItemTextStyled"
                    content={`${element}`}
                  />
                  <ListItemButtonStyled
                    id="listItemTextStyled"
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    <ListItemTextStyled>{element}</ListItemTextStyled>
                    {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButtonStyled>
                </>
              ) : (
                <ListItemButtonStyled key={index} onClick={() => handleClick(index)}>
                  <ListItemText>{element}</ListItemText>
                  {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButtonStyled>
              )}

              <CollapseStyled in={openStates[index]} timeout="auto" unmountOnExit>
                <CameraSettingSubMenuList />
              </CollapseStyled>
            </>
          );
        })}
      </FlexColumnContainerUl>
    </>
  );
};

const ListItemButtonStyled = styled(ListItemButton)`
  width: 100%;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  :last-child {
    border-top: none;
  }
`;

const CollapseStyled = styled(Collapse)`
  width: 100%;
`;

const ListItemTextStyled = styled(ListItemText)`
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
