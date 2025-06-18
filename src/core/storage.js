export function saveEcho(value) {
  localStorage.setItem('moonlike-echo', value);
  let history = JSON.parse(localStorage.getItem('moonlike-echo-history') || '[]');
  if (!history.includes(value)) {
    history.push(value);
    localStorage.setItem('moonlike-echo-history', JSON.stringify(history));
  }
}

export function loadEchoHistory() {
  const echoList = document.getElementById('echo-list');
  const echoLog = document.getElementById('echo-log');
  const stored = localStorage.getItem('moonlike-echo-history');
  if (!stored || !echoList || !echoLog) return;

  const history = JSON.parse(stored);
  echoList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    echoList.appendChild(li);
  });

  echoLog.classList.add('visible');
}

export function clearEchoStorage() {
  localStorage.removeItem('moonlike-echo');
  localStorage.removeItem('moonlike-echo-history');
}