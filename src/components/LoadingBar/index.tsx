import React from 'react';

const LoadingBar: React.FC = () => {
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
        alignItems: 'center',
      }}
    >
      <img
        className="spinner-rotate"
        style={{ width: '200px' }}
        src="/spinner.svg"
        alt="Loading"
      />
    </div>
  );
};

export default LoadingBar;
