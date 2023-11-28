type PropsType = {
  children: React.ReactNode;
};

function ExampleLayout({ children }: PropsType) {
  return (
    <div>
      <p>It is Layout.</p>
      {children}
    </div>
  );
}

export default ExampleLayout;
