import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const dataInput = e.currentTarget.elements;

    let delay = Number(dataInput.delay.value);
    let step = Number(dataInput.step.value);
    let amount = Number(dataInput.amount.value);

    for (let position = 1; position <= amount; position ++) {
            delay += step;

  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}