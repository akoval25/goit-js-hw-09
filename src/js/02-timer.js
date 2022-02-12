import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const isSeconds = document.querySelector('[data-seconds]');
const isMinutes = document.querySelector('[data-minutes]');
const isHours = document.querySelector('[data-hours]');
const isDays = document.querySelector('[data-days]');

let selectedDate = null;
let ms = null;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d HH:MM:SS",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      btnStart.setAttribute('disabled', true);
      return Notify.failure('Please choose a date in the future');
    } else {
      Notify.success('The selected date is valid!');
      btnStart.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);
let date = null;
let onTime = null;
let intervalId = null;

const onStart = (e) => {
  e.preventDefault();

  intervalId = setInterval(() => { 
    date = new Date();
    ms = selectedDate - date.getTime();

    if (ms < 0) { clearInterval(intervalId) }
    else {
    const onTime = convertMs(ms);
      console.log(ms);
      getDataOnTimer(onTime);
      }
  }, 1000);
  
}



function getDataOnTimer(onTime) {
  isSeconds.textContent = addLeadingZero(onTime.seconds);
  isMinutes.textContent = addLeadingZero(onTime.minutes);
  isHours.textContent = addLeadingZero(onTime.hours);
  isDays.textContent = addLeadingZero(onTime.days);
 };

function addLeadingZero(value) { 
  return String(value).padStart(2, "0");
};

btnStart.addEventListener('click', onStart);

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
