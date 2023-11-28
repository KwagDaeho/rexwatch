export default function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center`',
      }}
    >
      <img style={{ width: '200px' }} src="/spinner.svg" alt="Loading" />
    </div>
  );
}
