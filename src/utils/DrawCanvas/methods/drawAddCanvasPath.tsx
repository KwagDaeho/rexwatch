export const drawAddCanvasPath = (ctx, points, readyToEnd, color) => {
  if (points.length) {
    ctx.strokeStyle = readyToEnd ? 'rgba(0,0,0,0.5)' : color;
    ctx.clearRect(0, 0, 9999, 9999);
    ctx.beginPath();
    points.map((point) => {
      ctx.lineTo(point.X, point.Y);
    });
    ctx.stroke();

    points.map((point, idx) => {
      const radius = idx ? 10 : 15;
      const circle = [point.X, point.Y, radius, 0, Math.PI * 2];
      ctx.beginPath();
      // ctx.fillStyle = `rgba(255,80,150,${(points.length - idx) / points.length})`;
      ctx.fillStyle = readyToEnd ? 'rgba(0,0,0,0.5)' : color;
      ctx.arc(...circle);
      // ctx.stroke();
      ctx.fill();
      // ctx.fillR(...square);
    });
  }
};
