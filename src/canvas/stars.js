let ctx, canvas;
let stars = [];
let mouseParticles = [];

export function initStars(canvasElement) {
  canvas = canvasElement;
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const numStars = 150;
  stars = []; // ✅ ispravno: koristi globalni niz

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }

  canvas.addEventListener('mousemove', (e) => {
    mouseParticles.push({
      x: e.clientX,
      y: e.clientY,
      alpha: 1,
      radius: Math.random() * 4 + 1
    });
  });
}

export function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Crtanje zvezda
  for (let star of stars) {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }

  // Crtanje tragova miša
  for (let i = 0; i < mouseParticles.length; i++) {
    const p = mouseParticles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(173, 216, 230, ${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      mouseParticles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animateStars);
}

export function startWarpStarfield() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const warpStars = [];

  for (let i = 0; i < 300; i++) {
    warpStars.push({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width / 2
    });
  }

  function animateWarpStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of warpStars) {
      star.z -= 0.5;

      if (star.z <= 0.1) {
        star.x = Math.random() * canvas.width - canvas.width / 2;
        star.y = Math.random() * canvas.height - canvas.height / 2;
        star.z = canvas.width / 2;
      }

      const sx = (star.x / star.z) * canvas.width + canvas.width / 2;
      const sy = (star.y / star.z) * canvas.height + canvas.height / 2;
      const radius = (1 - star.z / (canvas.width / 2)) * 2;

      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
      ctx.fill();
    }

    requestAnimationFrame(animateWarpStars);
  }

  animateWarpStars();
}