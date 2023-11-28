import { CustomTabs } from '@/components/CustomTabs';
import { EasySetting } from '@/components/CameraSettingSubMenu/ParameterSetting/EasySetting';
import {
  cameraNameState,
  parameterSettingDataState,
  selectedSettingChannelState,
  tabIndexState,
} from '@/recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DetailSetting } from './DetailSetting';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { ClickButton } from '@/components/ClickButton';
import { sendRequest } from '@/api/PostApi';

export const ParameterSetting = () => {
  const cameraName = useRecoilValue(cameraNameState);
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);
  const [parameterSettingData, setParameterSettingData] = useRecoilState(
    parameterSettingDataState,
  );
  const [selectedSettingChannel, setSelectedSettingChannel] = useRecoilState(
    selectedSettingChannelState,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await sendRequest({
        Command: 305,
        Channel: selectedSettingChannel + 1,
      });
      setParameterSettingData(result);
    };
    fetchData();
    setSelectedSettingChannel(0);
  }, []);

  return (
    <>
      <P>알고리즘 파라미터 설정 - {cameraName[selectedSettingChannel]}</P>
      <NavBar>
        <CustomTabs />
        {/* <ButtonContainer> */}
        <ClickButton
          onClick={() => {}}
          minwidth="80px"
          title={'저장'}
          background="#2477ec"
          margin="0"
        />
        {/* </ButtonContainer> */}
      </NavBar>
      <ComponentsContainer>
        {tabIndex === 0 && <EasySetting />}
        {tabIndex === 1 && <DetailSetting />}
      </ComponentsContainer>
    </>
  );
};
const P = styled('p')`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  font-weight: bold;
  font-size: 24px;
`;
const NavBar = styled('div')`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonContainer = styled('div')`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const ComponentsContainer = styled('div')`
  width: 100%;
  margin: 0 auto;
`;
