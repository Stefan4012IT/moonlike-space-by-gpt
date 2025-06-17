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
  message?.classList.add('gone');
 
  // prvo blur, onda poruka
  setTimeout(() => {
    fragmentEl.textContent = "You’re now within.";
    container.classList.remove('blur');

    setTimeout(() => {
      container.classList.remove('fade-out');
    }, 100); // da fade-out ide nakon blur-a

    const echoBox = document.getElementById('echo-container');
    const echoInput = document.getElementById('echo-input');
    if (echoBox) {
      echoBox.classList.remove('hidden');
      echoBox.classList.add('visible');


      // Postavi prethodno upisanu poruku (ako postoji)
      const savedEcho = localStorage.getItem('moonlike-echo');
      if (savedEcho && echoInput) {
        echoInput.value = savedEcho;
      }


      // Reaguj na promenu u inputu
      echoInput?.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.trim() === '') {
          localStorage.removeItem('moonlike-echo');
        } else {
          localStorage.setItem('moonlike-echo', value);
        }
      });


    }
  }, 2000);

});

function triggerBlackout() {
  const flash = document.getElementById('blackout-flash');
  if (!flash) return;

  flash.style.opacity = '1';

  setTimeout(() => {
    flash.style.opacity = '0';
  }, 400);
}

function scheduleBlackout() {
  const delay = Math.floor(Math.random() * 60000) + 30000; // 30–90s

  setTimeout(() => {
    if (!shifted) triggerBlackout();
    scheduleBlackout(); // nastavi dalje
  }, delay);
}

scheduleBlackout();

function triggerGlitch() {
  fragmentEl.classList.add('glitch');
  setTimeout(() => {

    fragmentEl.classList.remove('glitch');
  }, 400);
}

function scheduleFragmentShift() {
  const delay = Math.floor(Math.random() * 20000) + 10000; // 10-30s

  setTimeout(() => {

    if (!shifted) {
      triggerGlitch();
      setTimeout(() => {
        fragmentEl.textContent = getRandomFragment();
        scheduleFragmentShift();
      }, 300);
    }
  }, delay);
}

scheduleFragmentShift();



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

const exitBtn = document.getElementById('exit-btn');

exitBtn?.addEventListener('click', () => {
  localStorage.removeItem('moonlike-echo');

  // Fade to black
  const blackout = document.createElement('div');
  blackout.style.position = 'fixed';
  blackout.style.top = '0';
  blackout.style.left = '0';
  blackout.style.width = '100%';
  blackout.style.height = '100%';
  blackout.style.background = '#000';
  blackout.style.transition = 'opacity 2s ease';
  blackout.style.opacity = '0';
  blackout.style.zIndex = '9999';

  document.body.appendChild(blackout);

  // Aktiviraj fade
  setTimeout(() => {
    blackout.style.opacity = '1';
  }, 10);

  // Resetuj svet nakon fade-a
  setTimeout(() => {
    location.reload();
  }, 3000);
});




let inactivityTimer;

function showWhisper() {
  const whisper = document.getElementById('inactivity-whisper');
  if (whisper && !shifted) {
    whisper.classList.add('visible');
  }
}

function hideWhisper() {
  const whisper = document.getElementById('inactivity-whisper');
  if (whisper) {
    whisper.classList.remove('visible');
  }
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  hideWhisper();

  inactivityTimer = setTimeout(() => {
    showWhisper();
  }, 6000); // 60 sec
}

window.addEventListener('mousemove', resetInactivityTimer);
resetInactivityTimer();