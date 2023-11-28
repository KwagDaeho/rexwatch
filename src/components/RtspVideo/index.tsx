import React, { useEffect, useRef } from 'react';
import jsmpeg from 'jsmpeg';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { clickedCameraNumberState } from '@/recoil/atoms';

const cameraAddresses = [
  'ws://192.168.0.200:10000',
  'ws://192.168.0.200:10001',
  'ws://192.168.0.200:10002',
  'ws://192.168.0.200:10003',
];
function CameraCanvas({ cameraName, address }) {
  const canvasRef = useRef();
  const containerRef = useRef(null);
  const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  };
  const onDoubleClick = () => {
    if (containerRef.current) {
      requestFullscreen(containerRef.current);
    }
  };
  useEffect(() => {
    const client = new WebSocket(address);
    const player = new jsmpeg(client, { canvas: canvasRef.current });

    return () => {
      client.close();
      // player.destroy();
    };
  }, [address]);

  return (
    <VideoElement ref={containerRef} onDoubleClick={onDoubleClick}>
      <P>{cameraName}</P>
      <Canvas ref={canvasRef}></Canvas>
    </VideoElement>
  );
}

function RtspVideo() {
  const clickedList = useRecoilValue(clickedCameraNumberState);
  return (
    <>
      {clickedList.map((cameraName, index) => {
        return (
          <>
            <CameraCanvas
              key={cameraName}
              cameraName={cameraName}
              address={cameraAddresses[index]}
            />
          </>
        );
      })}
    </>
  );
}

export default RtspVideo;

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Canvas = styled('canvas')`
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
  background-color: #000;
`;
const VideoElement = styled('div')`
  position: relative;
  border: 1px solid #9d9d9d;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;
const P = styled('p')`
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 25px;
  color: #f4df3a;
`;
