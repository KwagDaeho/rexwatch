/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/system';
import { ModalHeader } from '../../ModalHeader';
import { ModalBody } from '../../ModalBody';
import { ModalFooter } from '../../ModalFooter';
import { useEffect } from 'react';
import { sendRequest } from '@/api/PostApi';
import { useRecoilState } from 'recoil';
import { settingModalDataState } from '@/recoil/atoms';

export const SettingModal = () => {
  const [settingOSDData, setSettingOSDData] = useRecoilState(settingModalDataState);

  useEffect(() => {
    const fetchData = async () => {
      const data = { Command: 104 }; // 104로 나중에 변경?
      const result = await sendRequest(data);
      setSettingOSDData(result.OSD);
    };

    fetchData();
  }, []);

  return (
    <Modal>
      <ModalContainer>
        <ModalHeader title={'카메라 OSD 설정'} />
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
`;

const ModalContainer = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${(props) => props.theme.palette.background.paper};
  border-color: ${(props) => props.theme.palette.background.default};
  border: 1px solid;
`;
