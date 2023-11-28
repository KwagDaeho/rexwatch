import styled from '@emotion/styled';
import { LabelForModule } from '../MuiStyled/InputLabel';
import { SelectForModule } from '../MuiStyled/Select';
import { InputLabel } from '@mui/material';

interface PropsType {
  type?: string;
  title?: string;
  value?: any;
  optionList?: [];
  onChangeOptions?: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

export const listItemTypeSelect = (props: PropsType) => {
  return (
    <>
      <Label htmlFor="options">{props.title}</Label>
      <Select id="options" value={props.optionList} onChange={props.onChangeOptions}>
        {props.value?.map((element: string, index: number) => {
          return (
            <option key={index} value={element}>
              {element}
            </option>
          );
        })}
      </Select>
    </>
  );
};

const Label = styled(InputLabel)``;
const Select = styled('select')``;
