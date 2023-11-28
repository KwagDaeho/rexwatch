import { styled } from '@mui/system';
import { Button, IconButton } from '@mui/material';

interface PropsType {
  title?: React.ReactNode;
  onClick?: (e?: any, element?: any) => void;
  background?: string;
  minwidth?: string;
  disabled?: boolean;
  width?: string;
  color?: string;
  id?: string;
  margin?: string;
}

interface ButtonStringProps {
  background?: string;
  minwidth?: string;
  disabled?: boolean;
  width?: string;
  color?: string;
  id?: string;
  margin?: string;
}

interface ButtonIconProps {
  background?: string;
  minwidth?: string;
  disabled?: boolean;
  width?: string;
  color?: string;
  id?: string;
  margin?: string;
}

export const ClickButton = (props: PropsType) => {
  const isString = typeof props.title === 'string';
  return (
    <>
      {isString ? (
        <ButtonString
          background={props.background}
          minwidth={props.minwidth}
          width={props.width}
          onClick={props.onClick}
          disabled={props.disabled}
          id={props.id}
          margin={props.margin}
        >
          {props.title}
        </ButtonString>
      ) : (
        <ButtonIcon
          id={props.id}
          background={props.background}
          width={props.width}
          minwidth={props.minwidth}
          onClick={props.onClick}
          disabled={props.disabled}
          margin={props.margin}
        >
          {props.title}
        </ButtonIcon>
      )}
    </>
  );
};

const ButtonString = styled(Button)<ButtonStringProps>`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  border-radius: 5px !important;
  margin: ${(props) => props.margin || '0 5px'} !important;
  color: #fff !important;
  width: ${(props) => props.width} !important;
  min-width: ${(props) => props.minwidth || '180px'} !important;
  height: 40px !important;
  background-color: ${(props) => props.background || '#3d3d3d'} !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important; // 여기에 쉐도우 추가
`;

const ButtonIcon = styled(IconButton)<ButtonIconProps>`
  width: 30px !important;
  height: 30px !important;
  color: ${(props) => props.color} !important;
`;
