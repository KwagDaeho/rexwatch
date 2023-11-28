import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';
import { ClickButton } from '../ClickButton';
import styled from '@emotion/styled';

interface PropsType {
  headerText: string;
}

export const EditUserModalHeader = ({ headerText }: PropsType) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, editModal: false }));
  };
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
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonContainer = styled('div')`
  position: absolute;
  top: 25px;
  right: 25px;
  /* margin-right: 20px; */
`;
const P = styled('p')`
  position: absolute;
  font-size: 20px;
  width: 80%;
  padding: 20px 0;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-weight: bold;
  border-bottom: 1px solid #c3c3c3;
`;
