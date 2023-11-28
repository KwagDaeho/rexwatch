type PropsType = {
  children: React.ReactElement;
};

function Layout({ children }: PropsType) {
  return <div>{children}</div>;
  return (
    <div>
      <h1>This is CameraView Page Layout.</h1>
      {children}
    </div>
  );
}

export default Layout;
