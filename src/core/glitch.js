export function triggerGlitch() {
  const fragmentEl = document.getElementById('fragment');
  if (!fragmentEl) return;

  fragmentEl.classList.add('glitch');
  setTimeout(() => {
    fragmentEl.classList.remove('glitch');
  }, 500);
}