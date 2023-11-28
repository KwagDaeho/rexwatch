import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ClickButton } from '../ClickButton';
import styled from '@emotion/styled';

interface PropsType {
  headerText: string;
  handleClick: () => void;
}

export const AddUserModalHeader = ({ headerText, handleClick }: PropsType) => {
  return (
    <Container>
      <ButtonContainer>
        <ClickButton title={<CloseIcon />} onClick={handleClick} />
      </ButtonContainer>
      <P>{headerText}</P>
    </Container>
  );
};
const Container = styled('div')`
  width: 100%;
  position: relative;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonContainer = styled('div')`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const P = styled('p')`
  position: absolute;
  font-size: 20px;
  width: 90%;
  padding-bottom: 20px;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-weight: bold;
  border-bottom: 1px solid #c3c3c3;
`;
