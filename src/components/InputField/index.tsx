import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const InputField = ({ error, helperText, name, title, value, onChange }) => {
  return (
    <Container>
      <Label>{title}</Label>
      {title === '보드 번호' ? (
        <Input
          error={error}
          helperText={helperText}
          onChange={onChange}
          type="text"
          name={name}
          defaultValue={value}
          size="small"
        />
      ) : (
        <InputDisabled
          onChange={onChange}
          type="text"
          name={name}
          defaultValue={value}
          disabled
          size="small"
          sx={{ backgroundColor: 'ButtonFace', borderRadius: '5px' }}
        />
      )}
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const Label = styled('label')`
  width: 20%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px 0;
`;

const Input = styled(TextField)`
  width: 70%;
  /* border: 1px solid #333; */
  /* border-color: ${(props) => props.theme.palette.info.main}; */
`;
const InputDisabled = styled(TextField)`
  width: 70%;
`;
