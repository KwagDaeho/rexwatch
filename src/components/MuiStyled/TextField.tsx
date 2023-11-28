'use client';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const TextFieldMain = styled(TextField)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const InputMain = styled('input')`
  color: ${(props) => props.theme.palette.primary.main};
`;
export const MainTextField = styled(TextFieldMain)`
  margin: 10px 0; // 상하로 여백 추가
  width: 500px;
  height: 50px;
`;

export const LoginPasswordTextField = styled(TextFieldMain)`
  margin: 10px 0; // 상하로 여백 추가
  width: 500px;
  height: 50px;
`;

export const ChangePasswordTextField = styled(TextFieldMain)`
  margin: 10px 0; // 상하로 여백 추가
  width: 300px;
  height: 50px;
  margin-left: 30px;
`;

export const CapchaTextField = styled(TextFieldMain)`
  margin: 10px 10; // 상하로 여백 추가
  width: 250px;
  height: 50px;
  /* padding: 10px; */
  margin-right: 10px;
`;
export const FixedCapchaTextField = styled(CapchaTextField)`
  position: fixed; // position을 fixed로 설정
  justify-content: 'flex-start';
  display: 'flex';
  align-items: 'flex-start';
  margin-right: 250px;
  margin-top: 70px;
`;

export const AddUserTextField = styled(TextFieldMain)`
  width: 250px;
  margin-top: 10px;
  margin-bottom: 10px;

  input {
    height: 20px;
    padding: 6px 6px; // 패딩을 조절하여 원하는 높이를 얻을 수 있습니다.
    font-size: 14px;
  }
`;
export const AddUserTextFieldWithIcon = styled(TextFieldMain)`
  width: 185px;
  margin-top: 10px;
  margin-bottom: 10px;

  input {
    height: 20px;
    padding: 6px 6px; // 패딩을 조절하여 원하는 높이를 얻을 수 있습니다.
    font-size: 14px;
  }

  /* 추가된 코드 시작 */
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #d1cccc; // 원하는 비활성화 배경색으로 설정
    pointer-events: none; // 마우스 이벤트를 받지 않게 함

`}/* 추가된 코드 끝 */
`;
export const AddUserMiniTextField = styled(TextFieldMain)`
  width: 70px;
  margin-top: 10px;
  margin-bottom: 10px;

  input {
    height: 20px;
    padding: 6px 6px; // 패딩을 조절하여 원하는 높이를 얻을 수 있습니다.
    font-size: 14px;
  }
`;

export const AddIPUserTextField = styled(TextFieldMain)`
  /* width: 80px; */
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  input {
    height: 30px;
    padding: 6px 6px; // 패딩을 조절하여 원하는 높이를 얻을 수 있습니다.
    font-size: 14px;
    width: 200px;
  }
`;
