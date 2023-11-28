// import { DivPrimaryMain } from "src/components/MuiStyled/Div";

type PropsType = {
  children: React.ReactElement;
};

function ExampleLayout({ children }: PropsType) {
  return (
    <>
      {/* <DivPrimaryMain> */}
      <h1>It is Test Layout.</h1>
      {/* </DivPrimaryMain> */}
      {children}
    </>
  );
}

export default ExampleLayout;
