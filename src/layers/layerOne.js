import { animateStars } from '../canvas/stars.js';
import { loadEchoHistory, saveEcho } from '../core/storage.js';


export function initLayerOne() {
  const fragmentEl = document.getElementById('fragment');
  const portal = document.getElementById('portal');
  const echoBox = document.getElementById('echo-container');

  fragmentEl.textContent = "We’ve been waiting for you.";

  fragmentEl.addEventListener('click', () => {
    fragmentEl.textContent = "You’re now within.";
    document.body.classList.add('shifted');

    setTimeout(() => {
      if (echoBox) {
        echoBox.classList.remove('hidden');
        echoBox.classList.add('visible');
        echoInput?.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === '') {
            localStorage.removeItem('moonlike-echo');
            return;
          }
          saveEcho(value);
        });
      }

      if (portal) {
        portal.classList.remove('hidden');
        portal.classList.add('visible');
        fragmentEl.classList.add('fragment-fade');
      }
    }, 2000);
  });

  animateStars();
}
