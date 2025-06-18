import { startInfinityDrawing } from '../canvas/infinity.js';
import { startWarpStarfield, stopStars } from '../canvas/stars.js';
import { initReturnLayer } from './layerReturn.js';

export function initPortalLayer() {
  const portal = document.getElementById('portal');
  const fragmentEl = document.getElementById('fragment');
  const container = document.getElementById('container');

  if (!portal || !fragmentEl || !container) return;

  portal.addEventListener('click', () => {
    document.body.classList.add('portal-transition');

    fragmentEl.classList.remove('fragment-fade');
    fragmentEl.textContent = '';
    portal.classList.remove('visible');
    container.classList.add('fade-out');

    stopStars(); // ✋ zaustavi pulsirajuće zvezde

    setTimeout(() => {
      container.style.display = 'none';

      document.getElementById('echo-log')?.remove();
      document.getElementById('echo-container')?.remove();
      document.getElementById('reentry-message')?.remove();
      document.getElementById('hidden-message')?.remove();
      document.getElementById('fragment')?.remove();

      const secondLayer = document.createElement('div');
      secondLayer.classList.add('second-layer');
      secondLayer.innerHTML = `<p>You've crossed into the place where nothing remains... and yet something always returns.</p>`;
      document.body.appendChild(secondLayer);

      const returnBtn = document.createElement('button');
      returnBtn.id = 'return-btn';
      returnBtn.innerText = 'Return';
      secondLayer.appendChild(returnBtn);

      setTimeout(() => {
        const infinityCanvas = document.createElement('canvas');
        infinityCanvas.id = 'infinity-canvas';
        document.body.appendChild(infinityCanvas);

        startInfinityDrawing(infinityCanvas);
        startWarpStarfield();
      }, 3500);

      initReturnLayer(); // aktiviraj return logiku

    }, 1000);
  });
}