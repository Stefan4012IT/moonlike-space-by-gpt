let ctx, canvas;
let stars = [];
let mouseParticles = [];

export function startInfinityDrawing(canvas) {
  ctx = canvas.getContext('2d');
  resizeInfinityCanvas();
  window.addEventListener('resize', resizeInfinityCanvas);

  function resizeInfinityCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const trails = [];

  window.addEventListener('mousemove', (e) => {
    trails.push({
      x: e.clientX,
      y: e.clientY,
      alpha: 1,
      size: 8 + Math.random() * 4,
      angle: 0
    });
  });

  function drawInfinity(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 10, size / 10);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-1, -1, -2, 1, 0, 2);
    ctx.bezierCurveTo(2, 1, 1, -1, 0, 0);
    ctx.closePath();
    ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`; // cyan
    ctx.lineWidth = 0.3;
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < trails.length; i++) {
      const t = trails[i];
      drawInfinity(ctx, t.x, t.y, t.size, t.alpha);
      t.alpha -= 0.01;
      if (t.alpha <= 0) {
        trails.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}