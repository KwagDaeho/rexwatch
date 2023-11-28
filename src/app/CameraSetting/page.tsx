'use client';

import { SettingComponents } from '@/components/CameraSettingSubMenu/SettingComponents';
import { SubMenuBar } from '@/components/SubMenuBar';
import styled from '@emotion/styled';

function CameraSetting() {
  return (
    <Container>
      <SubMenuBar title={'설정'} />
      <FlexContainer>
        <SettingComponents />
      </FlexContainer>
    </Container>
  );
}

export default CameraSetting;
const Container = styled('div')`
  display: flex;
  margin: 0 auto;
`;

const FlexContainer = styled('div')`
  width: 90%;
`;
