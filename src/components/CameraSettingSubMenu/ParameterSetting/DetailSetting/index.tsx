import styled from '@emotion/styled';
import { ToggleButtonComponents } from './ToggleButtonComponents';
import { DetailInputComponents } from './DetailInputComponents';

export const DetailSetting = () => {
  return (
    <FlexContainer>
      <Container>
        <ToggleButtonComponents />
        <DetailInputComponents />
      </Container>
    </FlexContainer>
  );
};

const FlexContainer = styled('div')`
  width: 100%;
  position: relative;
`;

const Container = styled('div')`
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
