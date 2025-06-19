import { dom } from '../core/dom.js';
import { getRandomFragment } from '../core/fragments.js';
import { saveEcho, loadEchoHistory } from '../core/storage.js';
import { scheduleFragmentShift } from '../core/fragmentShift.js';

export function initLayerZero(shiftedRef) {
  const {
    fragmentEl,
    portal,
    echoBox,
    echoInput,
    reentryMessage,
    shiftSound,
    container,
    message
  } = dom;

  if (!fragmentEl) return;

  fragmentEl.textContent = getRandomFragment();
  scheduleFragmentShift(fragmentEl, shiftedRef());

  fragmentEl.addEventListener('click', () => {
    // 1. shiftujemo
    shiftedRef(true);
    document.body.classList.add('shifted');

    // 2. audio
    if (shiftSound) {
      shiftSound.volume = 0.4;
      shiftSound.play().catch(() => {});
    }

    // 3. tranzicija
    container?.classList.add('fade-out', 'blur');
    message?.classList.add('gone');
    fragmentEl.textContent = "";
    setTimeout(() => {
    fragmentEl.classList.add('fade-in');
    container.classList.remove('blur');
    fragmentEl.textContent = "You’re now within.";
      // 5. skinemo fade-out
      setTimeout(() => {
        container?.classList.remove('fade-out');
      }, 100);
    }, 500);

    // 6. echo box
    if (echoBox) {
      echoBox.classList.remove('hidden');
      echoBox.classList.add('visible');
      loadEchoHistory();
    }

    // 7. portal posle 4s
    if (portal) {
      setTimeout(() => {
        portal.classList.add('visible');
        fragmentEl.style.display = 'none';
      }, 4000);
    }

    // 8. echo input
    let echoDebounce;

    echoInput?.addEventListener('input', (e) => {
    const value = e.target.value.trim();

    clearTimeout(echoDebounce); // restartuj svaki put

    if (value === '') return; // ne cuvamo prazno

    echoDebounce = setTimeout(() => {
        saveEcho(value);
        loadEchoHistory();
    }, 2000); // cekaj 2 sekunde bez tipkanja
    });

    // 9. stari echo
    const hasEcho = localStorage.getItem('moonlike-echo');
    if (hasEcho && reentryMessage) {
      setTimeout(() => {
        reentryMessage.classList.add('visible');
      }, 3000);
    }
  });
}