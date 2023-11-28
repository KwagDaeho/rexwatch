import styled from '@emotion/styled';
import { ClickButton } from '../ClickButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';

interface PropsType {
  title?: string;
}

export const ModalHeader = (props: PropsType) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  return (
    <Container>
      <P>{props.title}</P>
      <ButtonContainer>
        <ClickButton
          title={<CloseIcon />}
          onClick={() =>
            setModalOpen((prevState) => ({
              ...prevState,
              settingModal: false,
              editModal: false,
              registerModal: false,
              addUserModal: false,
            }))
          }
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  position: relative;
  height: 80px;
`;
const ButtonContainer = styled('div')`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
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
