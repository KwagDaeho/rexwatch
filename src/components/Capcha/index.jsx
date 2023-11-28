import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export const Capcha = () => {
  const [imageSrc, setImageSrc] = useState('');
  const handleRefresh = () => setImageSrc('');

  useEffect(() => {
    fetch('http://192.168.0.200:8080/api/v1/sign/capcha', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.text())
      .then((data) => setImageSrc(`data:image/png;base64,${data}`))
      .catch(console.error);
  }, [imageSrc]);

  const ImageComponent = imageSrc ? 'img' : 'CapchaImage';

  return (
    <div style={{ position: 'relative' }}>
      <ImageComponent
        id="image_capcha"
        src={imageSrc || require('../../data/assets/capchaError.png')}
        alt="Capcha"
        style={{ marginLeft: '30px', marginTop: '10px', position: 'fixed' }}
      />
      <Button
        style={{ position: 'fixed', marginLeft: '200px', marginTop: '20px' }}
        id="refresh_capcha"
        onClick={handleRefresh}
      >
        <RefreshIcon />
      </Button>
    </div>
  );
};
