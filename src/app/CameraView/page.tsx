'use client';

import { SubMenuBar } from '@/components/SubMenuBar';
import { VideoContainer } from '@/components/VideoContainer';
import styled from '@emotion/styled';

function CameraView() {
  return (
    <Container>
      <SubMenuBar title={'카메라'} />
      <FlexContainer>
        <VideoContainer />
      </FlexContainer>
    </Container>
  );
}

export default CameraView;

const Container = styled('div')`
  display: flex;
  margin: 0 auto;
`;
const FlexContainer = styled('div')`
  width: 90%;
`;
