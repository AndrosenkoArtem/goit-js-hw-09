import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

let isActive = false;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(position);
      } else {
        // Reject
        reject(position);
      }
    }, delay);
  });
  return promise;
}
function onSubmitForm(e) {
  e.preventDefault();
  const deleyInputValue = e.currentTarget.elements.delay.value;
  const stepInputValue = e.currentTarget.elements.step.value;
  const amountInputValue = e.currentTarget.elements.amount.value;
  let currentPosition = 0;
  let currentDelay = Number(deleyInputValue);
  if (isActive) {
    return;
  }
  isActive = true;

  const promiseResultInterval = setInterval(() => {
    currentPosition += 1;
    ifPromiseIntervalCompleted({
      promiseResultInterval,
      currentPosition,
      amountInputValue,
    });

    createPromise(currentPosition, deleyInputValue)
      .then(position => {
        currentDelay += Number(stepInputValue);
        createPrimiseSuccsess({ currentDelay, stepInputValue, position });
      })
      .catch(position => {
        currentDelay += Number(stepInputValue);
        createPromiseFailed({ currentDelay, stepInputValue, position });
      });
  }, stepInputValue);
}
function ifPromiseIntervalCompleted({
  promiseResultInterval,
  currentPosition,
  amountInputValue,
}) {
  if (currentPosition >= amountInputValue) {
    clearInterval(promiseResultInterval);
    isActive = false;
    currentPosition = 0;

    return;
  }
}
function createPrimiseSuccsess({ currentDelay, stepInputValue, position }) {
  Notiflix.Notify.success(
    `✅ Fulfilled promise ${position} in ${
      currentDelay - Number(stepInputValue)
    }ms`
  );
}
function createPromiseFailed({ currentDelay, stepInputValue, position }) {
  // currentDelay += Number(stepInputValue);
  Notiflix.Notify.failure(
    `❌ Rejected promise ${position} in ${
      currentDelay - Number(stepInputValue)
    }ms`
  );
}

form.addEventListener('submit', onSubmitForm);
//
// function onSubmitForm(e) {
//   e.preventDefault();
//   let currentDelay = Number(refs.delay[0].value);

//   if (isActive) {
//     return;
//   }
//   isActive = true;
//   promiseResultInterval = setInterval(() => {
//     currentPosition += 1;
//     if (currentPosition > Number(refs.amount[0].value)) {
//       clearInterval(promiseResultInterval);
//       isActive = false;
//       currentPosition = 0;

//       return;
//     }

//     createPromise(currentPosition, refs.delay[0].value)
//       .then(({ position, delay }) => {
//         currentDelay += Number(refs.step[0].value);
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${
//             currentDelay - Number(refs.step[0].value)
//           }ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         currentDelay += Number(refs.step[0].value);
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${
//             currentDelay - Number(refs.step[0].value)
//           }ms`
//         );
//       });
//   }, refs.step[0].value);
// }
