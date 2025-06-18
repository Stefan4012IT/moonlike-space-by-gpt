import { loadEchoHistory, saveEcho } from '../core/storage.js';

export function initLayerIntro() {
  const fragmentEl = document.getElementById('fragment');
  const portal = document.getElementById('portal');
  const echoBox = document.getElementById('echo-container');
  const echoInput = document.getElementById('echo-input');
  const reentryMessage = document.getElementById('reentry-message');

  if (!fragmentEl) return;

  fragmentEl.textContent = "We’ve been waiting for you.";

  fragmentEl.addEventListener('click', () => {
    fragmentEl.textContent = "You’re now within.";
    document.body.classList.add('shifted');

    setTimeout(() => {
      echoBox?.classList.remove('hidden');
      echoBox?.classList.add('visible');
      loadEchoHistory();

      if (portal) {
        portal.classList.remove('hidden');
        portal.classList.add('visible');
        fragmentEl.classList.add('fragment-fade');
      }
    }, 2000);
  });

  // Echo input sa debounce
  let debounceTimeout;
  echoInput?.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value !== '') {
        saveEcho(value);
      }
    }, 800);
  });

  // Prikaži reentry message ako postoji echo
  const hasEcho = localStorage.getItem('moonlike-echo');
  if (hasEcho && reentryMessage) {
    setTimeout(() => {
      reentryMessage.classList.add('visible');
    }, 3000);
  }
}
