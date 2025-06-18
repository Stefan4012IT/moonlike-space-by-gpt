import { getRandomFragment } from './fragments.js';
import { triggerGlitch } from './glitch.js';

export function scheduleFragmentShift(fragmentEl, shifted) {
    if (!fragmentEl) return;
  const delay = Math.floor(Math.random() * 20000) + 10000;

  setTimeout(() => {
    if (!shifted) {
      triggerGlitch();
      setTimeout(() => {
        fragmentEl.textContent = getRandomFragment();
        scheduleFragmentShift(fragmentEl, shifted);
      }, 300);
    }
  }, delay);
}