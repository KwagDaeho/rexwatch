'use client';

import { useEffect, useRef, useState } from 'react';
import { drawShowCanvasPath } from 'src/utils/DrawCanvas/methods/drawShowCanvasPath';

// interface pointType {
//   X: number;
//   Y: number;
// }

const ShowDrawCanvas = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<any>(null);
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    canvas.width = 1440;
    canvas.height = 810;
    canvas.getContext('2d').lineCap = 'square';
  }, []);

  ctx && drawShowCanvasPath(ctx, props.points, props.addTypeColor);

  return (
    <canvas
      ref={canvasRef}
      style={{
        zIndex: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default ShowDrawCanvas;
