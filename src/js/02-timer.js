import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let timerId = null;
let millisecond = 0;
startBtnRef.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(params) {
  if (params < 0) {
    params = 0;
  }
  const result = String(params).padStart(2, '0');
  return result;
}

function updateTimerInterface(millisecond) {
  let delta = millisecond - Date.now();
  const { days, hours, minutes, seconds } = convertMs(delta);
  if (delta <= 0) {
    clearInterval(timerId);
    timerId = null;
    startBtnRef.disabled = true;
    daysRef.textContent = '00';
    hoursRef.textContent = '00';
    minutesRef.textContent = '00';
    secondsRef.textContent = '00';
    return;
  }

  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    millisecond = this.selectedDates[0].getTime();
    if (millisecond <= Date.now()) {
      return window.alert('Please choose a date in the future');
    }
    startBtnRef.disabled = false;
    updateTimerInterface(millisecond);
    return millisecond;
  },
};

flatpickr(inputRef, options);

function timerStart(e) {
  if (timerId) {
    return;
  }
  updateTimerInterface(millisecond);
  timerId = setInterval(() => {
    updateTimerInterface(millisecond);
  }, 1000);
}

startBtnRef.addEventListener('click', timerStart);
