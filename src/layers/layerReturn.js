import { animateStars } from '../canvas/stars.js';

export function initReturnLayer() {
  const returnBtn = document.getElementById('return-btn');
  if (!returnBtn) return;

  returnBtn.addEventListener('click', () => {
    // Ukloni second-layer i infinity canvas
    document.querySelector('.second-layer')?.remove();
    document.getElementById('infinity-canvas')?.remove();

    // Vrati primarni sloj
    const container = document.getElementById('container');
    const portal = document.getElementById('portal');
    const fragmentEl = document.getElementById('fragment');

    if (container && portal && fragmentEl) {
      container.style.display = 'block';
      portal.classList.remove('hidden');
      portal.classList.add('visible');
      fragmentEl.classList.remove('fragment-fade');
      fragmentEl.style.display = 'block';
      fragmentEl.textContent = "You’re now within.";
    }

    animateStars(); // ponovo pokreni mirne zvezde
  });
}