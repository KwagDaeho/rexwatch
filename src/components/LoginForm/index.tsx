// LoginForm.jsx
import { LoginFormContainer } from '@/components/MuiStyled/Div';

type PropsType = {
  children: React.ReactNode;
};

function LoginFormField({ children }: PropsType) {
  return (
    <LoginFormContainer>
      <form>{children}</form>
    </LoginFormContainer>
  );
}

export default LoginFormField;
