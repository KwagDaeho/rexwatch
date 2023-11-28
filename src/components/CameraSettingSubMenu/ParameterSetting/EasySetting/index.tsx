import styled from '@emotion/styled';
import { ClickButton } from '../../../ClickButton';
import { useState } from 'react';

export const EasySetting = () => {
  const [algorithmSimpleEvents, setAlgorithmSimpleEvents] = useState({
    pedestrian: 1,
    vehicleStop: 1,
    reverseDriving: 1,
  });

  const selectAllClick = (value) => {
    setAlgorithmSimpleEvents({
      pedestrian: value,
      vehicleStop: value,
      reverseDriving: value,
    });
  };

  return (
    <Container>
      <P>이벤트별 민감도 설정</P>
      <ComponentsContainer>
        <SelectBox>
          <Ul>
            <Li>
              <Label htmlFor="options">보행자 이벤트</Label>
              <Select id="options" value={algorithmSimpleEvents.pedestrian}>
                <option value="1">민감</option>
                <option value="2">보통</option>
                <option value="3">둔감</option>
              </Select>
            </Li>
            <Li>
              <Label htmlFor="options">차량정지 이벤트</Label>
              <Select id="options" value={algorithmSimpleEvents.vehicleStop}>
                <option value="1">민감</option>
                <option value="2">보통</option>
                <option value="3">둔감</option>
              </Select>
            </Li>
            <Li>
              <Label htmlFor="options">역주행 이벤트</Label>
              <Select id="options" value={algorithmSimpleEvents.reverseDriving}>
                <option value="1">민감</option>
                <option value="2">보통</option>
                <option value="3">둔감</option>
              </Select>
            </Li>
            <Li>
              <Label>일괄설정</Label>
              <ButtonContainer>
                <ClickButton
                  onClick={() => selectAllClick()}
                  margin="0 5px 0 0"
                  minwidth={'50px'}
                  title={'민감'}
                />
                <ClickButton
                  onClick={() => selectAllClick()}
                  margin="0 5px"
                  minwidth={'50px'}
                  title={'보통'}
                />
                <ClickButton
                  onClick={() => selectAllClick()}
                  margin="0 0 0 5px"
                  minwidth={'50px'}
                  title={'둔감'}
                />
              </ButtonContainer>
            </Li>
          </Ul>
        </SelectBox>
      </ComponentsContainer>
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  margin: 0 auto;
`;
const ComponentsContainer = styled('div')`
  width: 90%;
  margin: 0 auto;
  padding-left: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const SelectBox = styled('div')`
  width: 350px;
`;
const P = styled('p')`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  font-weight: bold;
  font-size: 18px;
`;
const Ul = styled('ul')`
  width: 100%;
`;
const Li = styled('li')`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled('label')`
  width: 40%;
  font-size: 14px;
`;
const Select = styled('select')`
  width: 50%;
  padding: 10px;
  border-radius: 5px;
`;
const ButtonContainer = styled('div')`
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  button {
    &:nth-last-child() {
      margin: 0;
    }
  }
`;
