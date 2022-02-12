
const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let intervalId = 0;

const onStart = (e) => {
  e.preventDefault();
  intervalId = setInterval(getRandomHexColor, 1000);
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');
}

const onStop = (e) => {
  e.preventDefault();
  clearInterval(intervalId);
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
}

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);


function getRandomHexColor() {
  return body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

