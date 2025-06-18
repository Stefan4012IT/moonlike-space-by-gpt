// main.js
import './style.scss';

import { initStars, animateStars, startWarpStarfield } from './canvas/stars.js';
import { startInfinityDrawing } from './canvas/infinity.js';

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

const canvas = document.getElementById('stars');
initStars(canvas);
animateStars();

function getRandomFragment() {
  const randomIndex = Math.floor(Math.random() * fragments.length);
  return fragments[randomIndex];
}

const fragmentEl = document.getElementById('fragment');
fragmentEl.textContent = getRandomFragment();

const reentryMessage = document.getElementById('reentry-message');
const hasEcho = localStorage.getItem('moonlike-echo');

if (hasEcho && reentryMessage) {
  setTimeout(() => {
    reentryMessage.classList.add('visible');
  }, 3000); // pojavi se lagano nakon što uđeš
}

const container = document.querySelector('.container');
const message = document.getElementById('hidden-message');
let shifted = false;
const shiftSound = document.getElementById('shift-sound');
const returnBtn = document.createElement('button');

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

      const echoLog = document.getElementById('echo-log');
      const echoList = document.getElementById('echo-list');

      function loadEchoHistory() {
        const stored = localStorage.getItem('moonlike-echo-history');
        if (!stored) return;
        const history = JSON.parse(stored);
        echoList.innerHTML = ''; // reset listu

        history.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          echoList.appendChild(li);
        });

        echoLog.classList.add('visible');
      }

      loadEchoHistory();

      const portal = document.getElementById('portal');
      if (portal && fragmentEl) {
        setTimeout(() => {
          portal.classList.add('visible');
          fragmentEl.style.display = 'none';
        }, 4000); // neka se pojavi malo kasnije, da "čekanje" ima težinu
        portal?.addEventListener('click', () => {
          // Fade out current world
          document.body.classList.add('portal-transition');

          // Ukloni prethodne poruke
          fragmentEl.classList.remove('fragment-fade');
          fragmentEl.textContent = '';
          portal.classList.remove('visible');
          container.classList.add('fade-out');

          setTimeout(() => {
            // Uklanjamo stare slojeve
            container.style.display = 'none';
            document.getElementById('echo-log')?.remove();
            document.getElementById('echo-container')?.remove();
            document.getElementById('reentry-message')?.remove();
            document.getElementById('portal')?.remove();
            document.getElementById('fragment')?.remove();
            document.getElementById('hidden-message')?.remove();


            // Dodajemo poruku iz drugog sloja
            const secondLayer = document.createElement('div');
            secondLayer.classList.add('second-layer');


            secondLayer.innerHTML = `<p>You've crossed into the place where nothing remains... and yet something always returns.</p>`;
            document.body.appendChild(secondLayer);
 
            returnBtn.id = 'return-btn';
            returnBtn.innerText = 'Return';
            secondLayer.appendChild(returnBtn);
            setTimeout(() => {
              const infinityCanvas = document.createElement('canvas');
              infinityCanvas.id = 'infinity-canvas';
              document.body.appendChild(infinityCanvas);

              startInfinityDrawing(infinityCanvas);
              startWarpStarfield();
            }, 300);
          }, 1000);
        });
      }


      // Postavi prethodno upisanu poruku (ako postoji)
      const savedEcho = localStorage.getItem('moonlike-echo');
      if (savedEcho && echoInput) {
        echoInput.value = savedEcho;
      }


      // Reaguj na promenu u inputu
      let echoDebounce;

      echoInput?.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        localStorage.setItem('moonlike-echo', value);

        clearTimeout(echoDebounce);
        echoDebounce = setTimeout(() => {
          if (value === '') return;

          let history = JSON.parse(localStorage.getItem('moonlike-echo-history') || '[]');
          if (!history.includes(value)) {
            history.push(value);
            localStorage.setItem('moonlike-echo-history', JSON.stringify(history));
            loadEchoHistory(); // osveži prikaz
          }
        }, 2000); // čeka 2 sekunde nakon poslednjeg unosa
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

// animateStars();
console.log("You’re not lost. You’re just early.");

const exitBtn = document.getElementById('exit-btn');

exitBtn?.addEventListener('click', () => {
  localStorage.removeItem('moonlike-echo');
  localStorage.removeItem('moonlike-echo-history');
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





returnBtn.addEventListener('click', () => {
  // Ukloni The Other Side
  document.querySelector('.second-layer')?.remove();
  document.getElementById('infinity-canvas')?.remove();

  // Vrati prvi sloj
  container.style.display = 'block';
  document.getElementById('portal')?.classList.add('visible');
  fragmentEl.style.display = 'block';
  fragmentEl.textContent = "You’re now within.";
  document.body.classList.add('shifted');
  container.classList.add('fade-out', 'blur');

  // Restart zvezda (pulsirajući sistem)
  animateStars();
});