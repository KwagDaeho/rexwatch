// LoginFields.jsx
'use client';
import React from 'react';
import { CapchaTextField } from '../MuiStyled/TextField';
import { CapchaIamge } from '@/components/MuiStyled/Image';

function CapchaField({ src }) {
  return (
    <>
      <div>
        <div>
          <CapchaTextField
            id="password"
            placeholder="capcha"
            type="capcha"
            name="capcha"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <CapchaIamge src={src} alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default CapchaField;
