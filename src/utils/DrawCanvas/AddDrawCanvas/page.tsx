'use client';

import { useEffect, useRef, useState } from 'react';
import { endAddDrawCanvas } from 'src/utils/DrawCanvas/methods/endAddDrawCanvas';
import { drawAddCanvasPath } from '../methods/drawAddCanvasPath';

interface pointType {
  X: number;
  Y: number;
}
const AddDrawCanvas = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<any>(null);
  const [points, setPoints] = useState<pointType[]>([]);
  const [readyToEnd, setReadyToEnd] = useState<boolean>(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    canvas.width = 1440;
    canvas.height = 810;
    canvas.getContext('2d').lineCap = 'square';
  }, []);

  useEffect(() => {
    drawAddCanvasPath(ctx, points, readyToEnd, props.addTypeColor);
  }, [points]);

  const getEventPosition = (e) => {
    return {
      X: e.clientX - canvasRef.current.offsetLeft - 40 - 280,
      Y: e.clientY - canvasRef.current.offsetTop - 100 + 2,
    };
  };

  const clickEvent = (e) => {
    if (!readyToEnd) {
      setPoints([...points, getEventPosition(e)]);
    } else {
      endAddDrawCanvas(
        [...points, { X: points[0].X, Y: points[0].Y }],
        props.rois,
        props.roiCode,
        props.setAreaData,
      );
      props.setDrawMode(0);
      props.setAddType(null);
      props.setChecked([...props.checked, props.roiCode]);
    }
  };
  const RightClickEvent = (e) => {
    e.preventDefault();
    let deletedPoints = [...points];
    deletedPoints?.pop();
    setPoints(deletedPoints);
  };

  const mouseMoveEvent = (e) => {
    drawAddCanvasPath(
      ctx,
      points.concat(getEventPosition(e)),
      readyToEnd,
      props.addTypeColor,
    );
    if (
      points.length &&
      Math.pow(getEventPosition(e).X - points[0]?.X, 2) +
        Math.pow(getEventPosition(e).Y - points[0]?.Y, 2) <
        Math.pow(15, 2)
    ) {
      setReadyToEnd(true);
    } else {
      setReadyToEnd(false);
    }
  };
  return (
    <canvas
      ref={canvasRef}
      style={{
        zIndex: 5,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'transparent',
      }}
      onClick={!props.addDrawEnd ? clickEvent : null}
      onMouseMove={!props.addDrawEnd ? mouseMoveEvent : null}
      onMouseLeave={() =>
        drawAddCanvasPath(ctx, points, readyToEnd, props.addTypeColor)
      }
      onContextMenu={!props.addDrawEnd ? RightClickEvent : null}
    />
  );
};

export default AddDrawCanvas;
