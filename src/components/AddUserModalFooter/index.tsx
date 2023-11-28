import { useRecoilState } from 'recoil';
import { modalOpenState } from '@/recoil/atoms';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ClickButton } from '../ClickButton';
import { PasswordSpanText } from '../MuiStyled/Span';

interface PropsType {}

export const AddUserModalFooter = ({
  onClickCancel,
  onClickRegister,
  isIdChecked,
}) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const handleClick = () => {
    setModalOpen((prevState) => ({ ...prevState, addUserModal: false }));
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 20,
        width: '100%',
      }}
    >
      <div style={{ marginRight: '5px' }}>
        <ClickButton
          title={'취소'}
          background={'#d3d4d6'}
          minwidth="200px"
          onClick={onClickCancel}
        />
      </div>
      <ClickButton
        title={'등록'}
        disabled={!isIdChecked}
        background={isIdChecked ? '#2477ec' : '#d3d4d6'}
        minwidth="200px"
        onClick={onClickRegister}
      />
    </div>
  );
};

const Container = styled(Box)`
  width: 100%;
  height: auto; // auto로 설정하여 내용에 따라 높이가 조절되도록 합니다.
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column; // 이 부분을 수정합니다.
`;

const StyledButton = styled(Button)`
  margin-left: 10px;

  &:hover {
    color: red;
  }
`;
