import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: document.getElementsByName('delay'),
  step: document.getElementsByName('step'),
  amount: document.getElementsByName('amount'),
};
let currentPosition = 0;
let promiseResultInterval = null;
let isActive = false;
// let currentDelay = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
function onSubmitForm(e) {
  e.preventDefault();
  let currentDelay = Number(refs.delay[0].value);

  if (isActive) {
    return;
  }
  isActive = true;
  promiseResultInterval = setInterval(() => {
    currentPosition += 1;
    if (currentPosition > Number(refs.amount[0].value)) {
      clearInterval(promiseResultInterval);
      isActive = false;
      currentPosition = 0;

      return;
    }

    createPromise(currentPosition, refs.delay[0].value)
      .then(({ position, delay }) => {
        currentDelay += Number(refs.step[0].value);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${
            currentDelay - Number(refs.step[0].value)
          }ms`
        );
      })
      .catch(({ position, delay }) => {
        currentDelay += Number(refs.step[0].value);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${
            currentDelay - Number(refs.step[0].value)
          }ms`
        );
      });
  }, refs.step[0].value);
}
refs.form.addEventListener('submit', onSubmitForm);
//
