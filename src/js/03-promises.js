import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayRef = document.querySelector("input[name='delay']")
const delayStepRef = document.querySelector("input[name='step']")
const amountRef = document.querySelector("input[name='amount']")
const btn = document.querySelector("button")

btn.addEventListener("click", onCreateClick)

function onCreateClick(e) {
  e.preventDefault()

  const firstDelayValue = Number(firstDelayRef.value)
  const delayStepValue = Number(delayStepRef.value)
  const amountValue = Number(amountRef.value)

  if (firstDelayValue < 0 || delayStepValue < 0 || amountValue < 1) {
    Notify.warning("Please fill all fields correctly")
    return
  }

  // createPromise(1, firstDelayValue).then(onFulfilled).catch(onRejected)

  let nextDelay = firstDelayValue

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, nextDelay).then(onFulfilled).catch(onRejected)
    nextDelay += delayStepValue
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      const promise = {
        position,
        delay
      }

      if (shouldResolve) {
        resolve(promise)
      } else {
        reject(promise)
      }
    }, delay)
  })
}

function onFulfilled({position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onRejected({position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

