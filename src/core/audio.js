export function setupAudioToggle(audioEl, excludedSelectors = []) {
  if (!audioEl) return;

  document.body.addEventListener('click', (e) => {
    const target = e.target;

    const isExcluded = excludedSelectors.some(selector =>
      target.closest(selector)
    );

    if (isExcluded) return;

    if (audioEl.paused) {
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
    }
  });
}