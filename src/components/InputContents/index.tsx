'use client';
import React, { useState } from 'react';
import { listItemTypeInput } from '../listItemTypeInput';
import { listItemTypeSelect } from '../listItemTypeSelect';
import styled from '@emotion/styled';

interface PropsType {
  readonly type?: string;
  readonly title?: string;
  readonly value?: any;
  readonly optionList?: [];
  onChange: (e: any) => void;
  name: any;
  validate?: (value: string) => [boolean, string];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  helperText: string;
  error: boolean;
}

function InputContents(props: PropsType, inputRef: React.Ref<HTMLInputElement>) {
  const [optionList, setOptionList] = useState('');
  const onChangeOptions = (e: any) => {
    setOptionList(e.target.value);
  };

  return (
    <Container>
      {props.type === 'input' && listItemTypeInput({ ...props, inputRef })}
      {props.type === 'select' &&
        listItemTypeSelect({
          type: props.type,
          title: props.title,
          value: props.value,
          optionList: props.optionList,
          onChangeOptions,
        })}
    </Container>
  );
}

export default React.forwardRef(InputContents);

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 0;
  width: 100%;
  height: 60px;
`;
