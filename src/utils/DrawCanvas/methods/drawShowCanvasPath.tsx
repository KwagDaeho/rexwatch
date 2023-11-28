export const drawShowCanvasPath = (ctx, points, color) => {
  if (points?.length) {
    ctx.clearRect(0, 0, 9999, 9999);
    ctx.beginPath();
    points.map((point) => {
      ctx.lineTo(point.X * 1440, point.Y * 810);
    });
    ctx.lineTo(points[0].X * 1440, points[0].Y * 810);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
};
