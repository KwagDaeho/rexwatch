/* eslint-disable react/jsx-key */
import { selectedIndexState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import { ParameterSetting } from '../ParameterSetting';
import styled from '@emotion/styled';
import { AlgorithmSetting } from '../AlgorithmSetting';
import { DetectionAreaSetting } from '../DetectionAreaSetting';
import { useEffect } from 'react';
import { EventScheduleSetting } from '../EventScheduleSetting';

export const SettingComponents = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  const components = [
    <ParameterSetting />,
    <AlgorithmSetting />,
    <EventScheduleSetting />,
    <DetectionAreaSetting />,
  ];
  useEffect(() => {
    setSelectedIndex(0);
  }, []);
  return (
    <Container>{selectedIndex !== null && components[selectedIndex]}</Container>
  );
};
const Container = styled('div')`
  width: 100%;
`;
