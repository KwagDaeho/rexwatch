/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from '@mui/system';
import { LabelPrimaryMain } from '../MuiStyled/InputLabel';
import { InputMain } from '../MuiStyled/TextField';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material';

interface PropsType {
  type?: string;
  title?: string;
  value?: any;
  onChange?: (e: any) => void;
  name?: any;
  validate?: (value: string) => [boolean, string];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  helperText: string;
  error: boolean;
}

export const listItemTypeInput = (props: PropsType) => {
  const titleChange = () => {
    return props.title === 'RtspID'
      ? 'RTSP-ID'
      : props.title === 'RtspPW'
      ? 'RTSP-PW'
      : props.title === 'RtspPort'
      ? 'RTSP-PORT'
      : props.title === 'RtspUri'
      ? 'RTSP-URI'
      : props.title;
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Label>{titleChange()}</Label>
      {props.name === 'RtspPW' ? (
        <>
          <Input
            // error={isValid[props.name]} // 변경된 부분
            error={props.error} // 변경된 부분
            inputRef={props.inputRef}
            onChange={props.onChange}
            onBlur={props.onBlur}
            // helperText={helperText[props.name]} // 변경된 부분
            helperText={props.helperText} // 변경된 부분
            // validate={props.validate}
            name={props.name}
            type={passwordVisible ? 'text' : 'password'}
            defaultValue={props.value}
            disabled={
              props.title === 'MAC' ||
              props.title === 'RTSP URI' ||
              props.title === 'WebRTC URI'
                ? true
                : false
            }
          />
          <VisibleToggleButton type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </VisibleToggleButton>
        </>
      ) : (
        <Input
          error={props.error} // 변경된 부분
          ref={props.ref}
          onChange={props.onChange}
          name={props.name}
          helperText={props.helperText} // 변경된 부분
          onBlur={props.onBlur}
          type={props.name}
          defaultValue={props.value}
          disabled={
            props.title === 'MAC' ||
            props.title === 'RTSP URI' ||
            props.title === 'WebRTC URI'
              ? true
              : false
          }
        />
      )}
    </>
  );
};
const Label = styled(LabelPrimaryMain)`
  display: flex;
  align-items: center;
  width: 25%;
  height: 20px;
`;

const Input = styled(TextField)`
  color: ${(props) => props.theme.palette.primary.main};
  width: 70%;
  padding: 12px 5px;
  border-radius: 5px;
  border-color: '#e1dbdb';
`;
const PasswordInputContainer = styled('div')`
  position: relative;
`;

const PasswordInput = styled(InputMain)`
  width: 100%;
  padding: 12px 5px;
  border-radius: 5px;
  border-color: '#e1dbdb';
`;

const VisibleToggleButton = styled('button')`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;

// /* eslint-disable react-hooks/rules-of-hooks */
// import { styled } from '@mui/system';
// import { LabelPrimaryMain } from '../MuiStyled/InputLabel';
// import { InputMain } from '../MuiStyled/TextField';
// import { useState } from 'react';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// interface PropsType {
//   type?: string;
//   title?: string;
//   value?: any;
//   onChange?: (e: any) => void;
//   name?: any;
// }

// export const listItemTypeInput = (props: PropsType) => {
//   const titleChange = () => {
//     return props.title === 'RtspID'
//       ? 'RTSP-ID'
//       : props.title === 'RtspPW'
//       ? 'RTSP-PW'
//       : props.title === 'RtspPort'
//       ? 'RTSP-PORT'
//       : props.title === 'RtspUri'
//       ? 'RTSP-URI'
//       : props.title;
//   };
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };
//   return (
//     <>
//       <Label>{titleChange()}</Label>
//       {props.name === 'RtspPW' ? (
//         <>
//           <Input
//             onChange={props.onChange}
//             name={props.name}
//             type={passwordVisible ? 'text' : 'password'}
//             defaultValue={props.value}
//             disabled={
//               props.title === 'MAC' ||
//               props.title === 'RTSP URI' ||
//               props.title === 'WebRTC URI'
//                 ? true
//                 : false
//             }
//           />
//           <VisibleToggleButton type="button" onClick={togglePasswordVisibility}>
//             {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
//           </VisibleToggleButton>
//         </>
//       ) : (
//         <Input
//           onChange={props.onChange}
//           name={props.name}
//           type={props.name}
//           defaultValue={props.value}
//           disabled={
//             props.title === 'MAC' ||
//             props.title === 'RTSP URI' ||
//             props.title === 'WebRTC URI'
//               ? true
//               : false
//           }
//         />
//       )}
//     </>
//   );
// };
// const Label = styled(LabelPrimaryMain)`
//   display: flex;
//   align-items: center;
//   width: 25%;
//   height: 20px;
// `;

// const Input = styled(InputMain)`
//   width: 70%;
//   padding: 12px 5px;
//   border-radius: 5px;
//   border-color: '#e1dbdb';
// `;
// const PasswordInputContainer = styled('div')`
//   position: relative;
// `;

// const PasswordInput = styled(InputMain)`
//   width: 100%;
//   padding: 12px 5px;
//   border-radius: 5px;
//   border-color: '#e1dbdb';
// `;

// const VisibleToggleButton = styled('button')`
//   position: absolute;
//   right: 15px;
//   top: 50%;
//   transform: translateY(-50%);
//   background: transparent;
//   border: none;
//   cursor: pointer;
// `;
