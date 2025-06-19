// main.js
import './style.scss';

import { initStars, animateStars, startWarpStarfield } from './canvas/stars.js';
import { startInfinityDrawing } from './canvas/infinity.js';
import { saveEcho, loadEchoHistory, clearEchoStorage } from './core/storage.js';
import { setupAudioToggle } from './core/audio.js';
import { getRandomFragment } from './core/fragments.js';
import { scheduleBlackout, triggerBlackout } from './core/blackout.js';
import { scheduleFragmentShift } from './core/fragmentShift.js';
import { setupInactivityMonitor } from './core/inactivity.js';
import { initLayerZero } from './layers/layerZero.js';
import { initPortalLayer } from './layers/layerPortal.js';


// Fragemnts of texts

const canvas = document.getElementById('stars');
initStars(canvas);
animateStars();

let shifted = false;
const getShifted = () => shifted;
const setShifted = (val) => { shifted = val; };
initLayerZero((val) => {
  if (val !== undefined) setShifted(val);
  return getShifted();
});

initPortalLayer();

const fragmentEl = document.getElementById('fragment');
fragmentEl.textContent = getRandomFragment();
fragmentEl.textContent = getRandomFragment();
scheduleFragmentShift(fragmentEl, shifted);

setupInactivityMonitor({ shiftedRef: () => shifted });

// const reentryMessage = document.getElementById('reentry-message');
// const hasEcho = localStorage.getItem('moonlike-echo');

// if (hasEcho && reentryMessage) {
//   setTimeout(() => {
//     reentryMessage.classList.add('visible');
//   }, 3000); // pojavi se lagano nakon što uđeš
// }

const container = document.querySelector('.container');
const message = document.getElementById('hidden-message');
const shiftSound = document.getElementById('shift-sound');
const returnBtn = document.createElement('button');

// fragmentEl.addEventListener('click', () => {
//   if (shifted) return; // da se ne dešava više puta
//   shifted = true;

//   shiftSound.volume = 0.4; // pojačavamo zvuk prelaza
//   shiftSound?.play();

//   document.body.classList.add('shifted');
//   container.classList.add('fade-out', 'blur');
//   message?.classList.add('gone');
 
//   // prvo blur, onda poruka
//   setTimeout(() => {
//     fragmentEl.textContent = "You’re now within.";
//     container.classList.remove('blur');

//     setTimeout(() => {
//       container.classList.remove('fade-out');
//     }, 100); // da fade-out ide nakon blur-a

//     const echoBox = document.getElementById('echo-container');
//     const echoInput = document.getElementById('echo-input');
//     if (echoBox) {
//       echoBox.classList.remove('hidden');
//       echoBox.classList.add('visible');

//       loadEchoHistory();

//       const portal = document.getElementById('portal');
//       if (portal && fragmentEl) {
//         setTimeout(() => {
//           portal.classList.add('visible');
//           fragmentEl.style.display = 'none';
//         }, 4000); // neka se pojavi malo kasnije, da "čekanje" ima težinu
//         portal?.addEventListener('click', () => {
//           // Fade out current world
//           document.body.classList.add('portal-transition');

//           // Ukloni prethodne poruke
//           fragmentEl.classList.remove('fragment-fade');
//           fragmentEl.textContent = '';
//           portal.classList.remove('visible');
//           container.classList.add('fade-out');

//           setTimeout(() => {
//             // Uklanjamo stare slojeve
//             container.style.display = 'none';
//             document.getElementById('echo-log')?.remove();
//             document.getElementById('echo-container')?.remove();
//             document.getElementById('reentry-message')?.remove();
//             document.getElementById('portal')?.remove();
//             document.getElementById('fragment')?.remove();
//             document.getElementById('hidden-message')?.remove();


//             // Dodajemo poruku iz drugog sloja
//             const secondLayer = document.createElement('div');
//             secondLayer.classList.add('second-layer');


//             secondLayer.innerHTML = `<p>You've crossed into the place where nothing remains... and yet something always returns.</p>`;
//             document.body.appendChild(secondLayer);
 
//             returnBtn.id = 'return-btn';
//             returnBtn.innerText = 'Return';
//             secondLayer.appendChild(returnBtn);
//             setTimeout(() => {
//               const infinityCanvas = document.createElement('canvas');
//               infinityCanvas.id = 'infinity-canvas';
//               document.body.appendChild(infinityCanvas);

//               startInfinityDrawing(infinityCanvas);
//               startWarpStarfield();
//             }, 300);
//           }, 1000);
//         });
//       }


//       // Reaguj na promenu u inputu
//       let echoDebounce;

//       echoInput?.addEventListener('input', (e) => {
//         const value = e.target.value.trim();
//         localStorage.setItem('moonlike-echo', value);

//         clearTimeout(echoDebounce);
//         echoDebounce = setTimeout(() => {
//           if (value === '') return;

//           let history = JSON.parse(localStorage.getItem('moonlike-echo-history') || '[]');
//           if (!history.includes(value)) {
//             history.push(value);
//             localStorage.setItem('moonlike-echo-history', JSON.stringify(history));
//             saveEcho(value);
//             loadEchoHistory(); // osveži prikaz
//           }
//         }, 2000); // čeka 2 sekunde nakon poslednjeg unosa
//       });


//     }
//   }, 2000);

// });

triggerBlackout();




scheduleBlackout();


scheduleFragmentShift();

// Sound like a space
setupAudioToggle(document.getElementById('bg-audio'), [
  '#portal',
  '#return-btn',
  '#exit-btn',
  '.echo-button',
  '#echo-input'
]);

// First Message
setTimeout(() => {
  const msg = document.getElementById('hidden-message');
  if (msg) msg.classList.add('visible');
}, 7000);

// animateStars();
console.log("You’re not lost. You’re just early.");

const exitBtn = document.getElementById('exit-btn');

exitBtn?.addEventListener('click', () => {
  clearEchoStorage();
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




// let inactivityTimer;

// function showWhisper() {
//   const whisper = document.getElementById('inactivity-whisper');
//   if (whisper && !shifted) {
//     whisper.classList.add('visible');
//   }
// }

// function hideWhisper() {
//   const whisper = document.getElementById('inactivity-whisper');
//   if (whisper) {
//     whisper.classList.remove('visible');
//   }
// }

// function resetInactivityTimer() {
//   clearTimeout(inactivityTimer);
//   hideWhisper();

//   inactivityTimer = setTimeout(() => {
//     showWhisper();
//   }, 6000); // 60 sec
// }

// window.addEventListener('mousemove', resetInactivityTimer);
// resetInactivityTimer();





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