import React from 'react';
import LoginHeader from '@/components/LoginHeader';
import LoginFormField from '@/components/LoginForm';
import { LoginSpanText } from '@/components/MuiStyled/Span';
import { VerticalLine } from '@/components/MuiStyled/Br';
import LoginFields from '@/components/LoginFields';

type PropsType = {
  children: React.ReactNode;
};

function LoginPage({ children }: PropsType) {
  return <LoginFormField>{children}</LoginFormField>;
}

export default LoginPage;
