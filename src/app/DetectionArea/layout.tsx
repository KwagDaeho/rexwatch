type PropsType = {
  children: React.ReactElement;
};

function Layout({ children }: PropsType) {
  return (
    <div>
      <h1>검지영역 Layout.</h1>
      {children}
    </div>
  );
}

export default Layout;
