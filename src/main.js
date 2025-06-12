// main.js
import './style.scss';

// Fragemnts of texts
const fragments = [
  "You arrived exactly when you were meant to.",
  "The gravity here feels optional.",
  "Nothing happens here, but you feel everything.",
  "Someone dreamed of you before you existed.",
  "This place is made of memory and static.",
  "The stars don’t speak – they listen.",
  "It’s always night here, but no one sleeps.",
  "You’re not lost. You’re just early."
];

function getRandomFragment() {
  const randomIndex = Math.floor(Math.random() * fragments.length);
  return fragments[randomIndex];
}

const fragmentEl = document.getElementById('fragment');
fragmentEl.textContent = getRandomFragment();

const container = document.querySelector('.container');
const message = document.getElementById('hidden-message');
let shifted = false;
const shiftSound = document.getElementById('shift-sound');

fragmentEl.addEventListener('click', () => {
  if (shifted) return; // da se ne dešava više puta
  shifted = true;

  shiftSound.volume = 0.4; // pojačavamo zvuk prelaza
  shiftSound?.play();

  document.body.classList.add('shifted');
  container.classList.add('fade-out', 'blur');
  message?.classList.remove('visible');
 
  // prvo blur, onda poruka
  setTimeout(() => {
    fragmentEl.textContent = "You’re now within.";
    container.classList.remove('blur');

    setTimeout(() => {
      container.classList.remove('fade-out');
    }, 100); // da fade-out ide nakon blur-a
  }, 2000);

});

// Sound like a space

window.addEventListener('click', () => {
  const audio = document.getElementById('bg-audio');
  if (audio && audio.paused) {
    audio.play().catch(() => console.log("Autoplay blocked"));
    audio.volume = 0.1;
  }
});

// Canvas with stars

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const numStars = 150;
const stars = [];

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  });
}

function animateStars() {
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



// Mouse float
const mouseParticles = [];

canvas.addEventListener('mousemove', (e) => {
  mouseParticles.push({
    x: e.clientX,
    y: e.clientY,
    alpha: 1,
    radius: Math.random() * 4 + 1
  });
});

// First Message
setTimeout(() => {
  const msg = document.getElementById('hidden-message');
  if (msg) msg.classList.add('visible');
}, 7000);

animateStars();
console.log("You’re not lost. You’re just early.");
