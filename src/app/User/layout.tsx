type PropsType = {
  children: React.ReactElement;
};

function Layout({ children }: PropsType) {
  return <div>{children}</div>;
}

export default Layout;
