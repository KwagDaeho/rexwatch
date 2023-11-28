export const drawEditCanvasPath = (ctx, points, targetPoint, color, position) => {
  if (points?.length) {
    ctx.clearRect(0, 0, 9999, 9999);
    const polygon = new Path2D();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    let indexGetter = [];
    points.map((point, idx) => {
      if (idx === 0) {
        polygon.moveTo(point.X * 1440, point.Y * 810);
      } else {
        polygon.lineTo(point.X * 1440, point.Y * 810);
      }
      if (ctx.isPointInStroke(polygon, position.X, position.Y)) {
        indexGetter.push(idx);
      }
    });
    polygon.lineTo(points[0].X * 1440, points[0].Y * 810);
    ctx.stroke(polygon);
    const isPointInPath = ctx.isPointInPath(polygon, position.X, position.Y);
    const isPointInStroke = ctx.isPointInStroke(polygon, position.X, position.Y);
    if (isPointInStroke && !targetPoint) {
      ctx.lineWidth = 12;
      ctx.fill();
    } else {
      ctx.lineWidth = 8;
    }
    ctx.stroke(polygon);
    const radius = 10;
    ctx.fillStyle = color;
    points.map((point) => {
      const circle = [point.X * 1440, point.Y * 810, radius, 0, Math.PI * 2];
      ctx.beginPath();
      ctx.arc(...circle);
      point === targetPoint || isPointInStroke ? ctx.fill() : null;
      ctx.stroke();
    });
    return [isPointInStroke, isPointInPath, points.length - indexGetter.length];
  }
};
