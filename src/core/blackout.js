let shifted = false; // iz maina ako želiš izvući kasnije kao shared state

export function triggerBlackout() {
  const flash = document.getElementById('blackout-flash');
  if (!flash) return;

  flash.style.opacity = '1';
  setTimeout(() => {
    flash.style.opacity = '0';
  }, 400);
}

export function scheduleBlackout() {
  const delay = Math.floor(Math.random() * 60000) + 30000;

  setTimeout(() => {
    if (!shifted) triggerBlackout();
    scheduleBlackout();
  }, delay);
}