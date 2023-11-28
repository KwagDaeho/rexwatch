'use client';

import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { drawEditCanvasPath } from 'src/utils/DrawCanvas/methods/drawEditCanvasPath';

// Props의 Type 선언
// interface PropsType {
//   num1?: number;
//   num2?: number;
//   num3?: number;
// }

interface pointType {
  X: number;
  Y: number;
}

const EditDrawCanvas = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<any>(null);
  const [points, setPoints] = useState<pointType[]>([]);
  const [targetPoint, setTargetPoint] = useState<pointType | undefined>();
  const [targetIdx, setTargetIdx] = useState<number | undefined>();
  const [isDrag, setIsDrag] = useState<boolean>(false);
  useEffect(() => {
    setPoints(props.targetPoints);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas?.getContext('2d'));
    canvas.width = 1440;
    canvas.height = 810;
    canvas.getContext('2d').lineCap = 'butt';
    canvas.getContext('2d').lineJoin = 'bevel';
  }, [props.targetPoints]);
  useEffect(() => {
    const newTargetIdx = points.findIndex((point) => targetPoint === point);
    newTargetIdx >= 0 && targetPoint ? setTargetIdx(newTargetIdx) : null;
    // setTargetIdx(newTargetIdx)
  }, [targetPoint]);
  // useEffect(() => {
  // }, [points]);

  const saveAreaData = (newPoints) => {
    let targetArea = {
      ...props.areaData.ROIs.find((x) => x.ROICode == props.roiCode),
    };
    let extraArea = props.areaData.ROIs.filter((x) => x.ROICode !== props.roiCode);
    delete targetArea.Areas;
    const newTargetArea = {
      Areas: [{ Area: { PointCount: points.length, Points: newPoints } }],
      ...targetArea,
    };
    extraArea.push(newTargetArea);
    props.setAreaData({ ROIs: extraArea });
  };
  // const getCenterPoint = (targetIdx) => {
  //   const prevTargetIdx = targetIdx === 0 ? points.length - 1 : targetIdx - 1;
  //   return {
  //     X: (Number(points[targetIdx].X) + Number(points[prevTargetIdx].X)) / 2,
  //     Y: (Number(points[targetIdx].Y) + Number(points[prevTargetIdx].Y)) / 2,
  //   };
  // };
  const addPoint = (e) => {
    const position = getEventPosition(e);
    newPoints = points
      .slice(0, isInIndex)
      .concat({
        X: Number((position.X / 1440).toFixed(3)),
        Y: Number((position.Y / 810).toFixed(3)),
      })
      .concat(points.slice(isInIndex));
    setPoints(newPoints);
    saveAreaData(newPoints);
  };

  const getEventPosition = (e) => {
    return {
      X: e.pageX - canvasRef.current.offsetLeft - 40 - 280,
      Y: e.pageY - canvasRef.current.offsetTop - 100 + 2,
    };
  };

  let newPoints = points;

  let isInStroke;
  let isInPath;
  let isInIndex;
  const mouseMoveEvent = (e) => {
    const position = getEventPosition(e);
    [isInStroke, isInPath, isInIndex] = drawEditCanvasPath(
      ctx,
      newPoints,
      targetPoint,
      props.addTypeColor,
      position,
    );
    const newPoint = document.getElementById('mouse_circle');
    if (isInStroke && !targetPoint) {
      newPoint.style.display = 'block';
      newPoint.style.left = position.X - 20 + 'px';
      newPoint.style.top = position.Y - 20 + 'px';
    } else {
      newPoint.style.display = 'none';
    }

    if (!isDrag) {
      setTargetPoint(
        points?.find((point) => {
          return (
            Math.pow(position.X - point.X * 1440, 2) +
              Math.pow(position.Y - point.Y * 810, 2) <
            Math.pow(10, 2)
          );
        }),
      );
    } else {
      if (targetPoint) {
        newPoints = points
          .slice(0, targetIdx)
          .concat({
            X: Number((position.X / 1440).toFixed(3)),
            Y: Number((position.Y / 810).toFixed(3)),
          })
          .concat(points.slice(targetIdx + 1));
      } else {
        newPoints = newPoints.map((point) => {
          return {
            X: point.X + Number((e.movementX / 1440).toFixed(3)),
            Y: point.Y + Number((e.movementY / 810).toFixed(3)),
          };
        });
      }
    }
  };
  const mouseDownEvent = (e) => {
    setIsDrag(true);
  };
  const mouseUpEvent = (e) => {
    setPoints(newPoints);
    saveAreaData(newPoints);
    setIsDrag(false);
  };
  const RightClickEvent = (e) => {
    e.preventDefault();
    [isInStroke, isInPath, isInIndex] = drawEditCanvasPath(
      ctx,
      newPoints,
      targetPoint,
      props.addTypeColor,
      getEventPosition(e),
    );
    if (isInStroke && !targetPoint) {
      addPoint(e);
    } else {
      setPoints(points.filter((point) => point !== targetPoint));
      saveAreaData(points.filter((point) => point !== targetPoint));
      setTargetPoint(undefined);
    }
  };

  drawEditCanvasPath(ctx, points, targetPoint, props.addTypeColor, points);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          zIndex: 5,
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
        }}
        onMouseDown={!props.isLocked ? mouseDownEvent : null}
        onMouseMove={!props.isLocked ? mouseMoveEvent : null}
        onMouseUp={!props.isLocked && isDrag ? mouseUpEvent : null}
        onContextMenu={!props.isLocked ? RightClickEvent : null}
        onMouseLeave={() => (!props.isLocked ? setIsDrag(false) : null)}
      />
      <div
        id="mouse_circle"
        style={{
          display: 'none',
          position: 'absolute',
          width: '40px',
          height: '40px',
          border: `4px solid ${props.addTypeColor}`,
          borderRadius: '100px',
          backfaceVisibility: 'hidden',
          zIndex: 4,
        }}
      ></div>
    </>
  );
};

export default EditDrawCanvas;
