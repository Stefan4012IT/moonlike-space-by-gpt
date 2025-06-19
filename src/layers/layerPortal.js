import { dom } from '../core/dom.js';
import { startInfinityDrawing } from '../canvas/infinity.js';
import { startWarpStarfield, stopStars } from '../canvas/stars.js';
import { initReturnLayer } from './layerReturn.js';

export function initPortalLayer() {
  const { portal, fragmentEl, container } = dom;

  if (!portal || !fragmentEl) return;

  portal.addEventListener('click', () => {
    document.body.classList.add('portal-transition');
    fragmentEl.classList.remove('fragment-fade');
    fragmentEl.textContent = '';
    portal.classList.remove('visible');

    // container.classList.add('fade-out');

    setTimeout(() => {
      // 1. Sakrijemo container
      container.style.display = 'none';

      // 2. Očistimo slojeve
      ['echo-log', 'echo-container', 'reentry-message', 'hidden-message', 'fragment'].forEach(id => {
        document.getElementById(id)?.remove();
      });

      // 3. Dodajemo second layer
      const secondLayer = document.createElement('div');
      secondLayer.classList.add('second-layer');
      secondLayer.innerHTML = `<p>You've crossed into the place where nothing remains... and yet something always returns.</p>`;
      document.body.appendChild(secondLayer);

      // 4. Dodajemo return dugme
      const returnBtn = document.createElement('button');
      returnBtn.id = 'return-btn';
      returnBtn.innerText = 'Return';
      secondLayer.appendChild(returnBtn);
      stopStars(); // zaustavi pulsiranje
      // 5. Pokrećemo infinity i warp posle malo kašnjenja
      

      // 6. Aktiviraj return sloj
      initReturnLayer();
    }, 1000);
    
    setTimeout(() => {

        const infinityCanvas = document.createElement('canvas');
        infinityCanvas.id = 'infinity-canvas';
        infinityCanvas.style.display = 'block';
        infinityCanvas.style.width = '100vw';
        infinityCanvas.style.height = '100vh';
        document.body.appendChild(infinityCanvas);


        startInfinityDrawing(infinityCanvas);
        startWarpStarfield();
      }, 1000);
  });
}