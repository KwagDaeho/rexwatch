import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { ToggleButtonList } from '../ToggleButtonList';
import { NestedButtonList } from '../NestedButtonList';

interface PropsType {
  title: string;
}

export const SubMenuBar = (props: PropsType) => {
  return (
    <>
      <AsideContainer>
        {props.title === '카메라' && (
          <>
            <TitleH3>{props.title}</TitleH3>
            <ToggleButtonList />
          </>
        )}
        {props.title === '설정' && (
          <>
            <TitleH3>{props.title}</TitleH3>
            <NestedButtonList />
          </>
        )}
      </AsideContainer>
    </>
  );
};

const InheritWidthButton = styled(Button)`
  width: 100%;
`;
const TitleH3 = styled('p')`
  text-align: center;
  padding: 20px 7px;
  font-weight: bold;
  font-size: 24px;
`;
const AsideContainer = styled('aside')`
  /* width: 11%; */
  width: 200px;
  min-width: 200px;
  height: 100vh;
  /* background-color: #fbfbfb; */
  border-right: 1px solid #c6c6c6;
  /* color: ${(props) => props.theme.palette.info.main}; */
`;
