import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let timerInterval = null;
let isTimerActive = false;
const date = new Date();

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  btnClear: document.querySelector('[data-clear]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= date.getTime()) {
      refs.btnStart.classList.add('not-active');
      refs.btnClear.classList.add('not-active');

      Notiflix.Notify.failure('зачем ⁉️');
      return;
    }
    refs.btnStart.classList.remove('not-active');
    refs.btnClear.classList.remove('not-active');
  },
};

const currentData = flatpickr(refs.input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function onStartTimer() {
  if (refs.btnStart.classList[0] === 'not-active' || isTimerActive) {
    return;
  }
  isTimerActive = true;
  Notiflix.Notify.success('timer started ✅');
  refs.input.disabled = true;

  timerInterval = setInterval(() => {
    let curruntTime = currentData.selectedDates[0].getTime() - Date.now();
    if (curruntTime <= 0 && timerInterval !== null) {
      isTimerActive = false;
      refs.input.disabled = false;
      clearInterval(timerInterval);
      Notiflix.Notify.success('timer is over 🎉');

      return;
    }
    let timeObject = convertMs(curruntTime);
    refs.days.textContent = timeObject.days;
    refs.hours.textContent = timeObject.hours;
    refs.minutes.textContent = timeObject.minutes;
    refs.seconds.textContent = timeObject.seconds;
  }, 1000);
}
function onStopTimer() {
  clearInterval(timerInterval);
  refs.input.disabled = false;
  isTimerActive = false;
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  Notiflix.Notify.failure('the timer has been cleared 🧹🧹🧹');
}
refs.btnStart.addEventListener('click', onStartTimer);
refs.btnClear.addEventListener('click', onStopTimer);
