let inactivityTimer;

export function setupInactivityMonitor({ whisperId = 'inactivity-whisper', delay = 60000, shiftedRef }) {
  const whisper = document.getElementById(whisperId);

  function showWhisper() {
    if (whisper && !shiftedRef()) {
      whisper.classList.add('visible');
    }
  }

  function hideWhisper() {
    if (whisper) {
      whisper.classList.remove('visible');
    }
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    hideWhisper();

    inactivityTimer = setTimeout(() => {
      showWhisper();
    }, delay);
  }

  window.addEventListener('mousemove', resetInactivityTimer);
  resetInactivityTimer();
}
