function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

function colorMixerStart() {
  startBtnRef.disabled = true;
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function colorMixerStop() {
  startBtnRef.disabled = false;
  clearInterval(timerId);
}

startBtnRef.addEventListener('click', colorMixerStart);
stopBtnRef.addEventListener('click', colorMixerStop);
