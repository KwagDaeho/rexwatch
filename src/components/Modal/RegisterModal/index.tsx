import { styled } from '@mui/system';
import { ModalHeader } from '../../ModalHeader';
import { ModalBody } from '../../ModalBody';
import { ModalFooter } from '../../ModalFooter';

export const RegisterModal = () => {
  return (
    <Modal>
      <ModalContainer>
        <ModalHeader title={'카메라 등록'} />
        <ModalBody />
        <ModalFooter />
      </ModalContainer>
    </Modal>
  );
};

const Modal = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
`;

const ModalContainer = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 5px;
  background-color: #fff;
`;
