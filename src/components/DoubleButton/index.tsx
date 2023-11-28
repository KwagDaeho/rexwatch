'use client';
import React, { useState, useCallback } from 'react';
import { CapchaTextField } from '../MuiStyled/TextField';
import { CapchaIamge } from '@/components/MuiStyled/Image';
import { StyledButton } from '../MuiStyled/button';

interface SingleButtonProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

function SingleButton({ title, active = false, onClick }: SingleButtonProps) {
  return (
    <StyledButton
      sx={{ fontWeight: 800, backgroundColor: '#30A9DE' }}
      active={active}
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
}

function DoubleButton({
  button1,
  button2,
  setActiveButton2,
  setActiveButton1,
  isActiveButton1,
  isActiveButton2,
}) {
  // Define state variables for active states

  // Define callback functions to toggle active states
  const toggleActiveButton1 = useCallback(() => {
    // isActiveButton1이 이미 true인 경우 아무 것도 하지 않습니다.
    if (!isActiveButton1) {
      setActiveButton1(true);
      setActiveButton2(false);
    }
  }, [isActiveButton1]);

  const toggleActiveButton2 = useCallback(() => {
    // Button2를 클릭하면 Button1은 비활성화되고 Button2는 활성화됩니다.
    setActiveButton1(false);
    setActiveButton2(true);
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SingleButton
        title={button1}
        active={isActiveButton1}
        onClick={toggleActiveButton1}
      />
      <SingleButton
        title={button2}
        active={isActiveButton2}
        onClick={toggleActiveButton2}
      />
    </div>
  );
}

export default DoubleButton;
