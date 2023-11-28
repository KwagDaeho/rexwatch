import { algorithmInputLabelList } from '@/data/cameraData';
import styled from '@emotion/styled';
import { InputLabel, TextField } from '@mui/material';

export const FirstColumn = () => {
  const InputLabelList = algorithmInputLabelList;

  return (
    <Container>
      {InputLabelList.slice(0, 19).map((element, index) => {
        return (
          <>
            <InputContainer>
              <Label>{element}</Label>
              <Input size="small" type="number" />
            </InputContainer>
          </>
        );
      })}
    </Container>
  );
};

const Container = styled('ul')`
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: space-between;
`;

const InputContainer = styled('li')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const Label = styled(InputLabel)`
  width: 65%;
  display: flex;
  font-size: 12px;
  align-items: center;
`;
const Input = styled(TextField)`
  width: 30%;
  color: ${(props) => props.theme.palette.primary.main};
  border-radius: 5px;
  border-color: '#e1dbdb';
  div {
    width: 100%;
    input {
      padding: 2px 0;
      font-size: 12px;
      text-align: right;
    }
  }
`;
