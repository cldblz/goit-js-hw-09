import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")
const daysRef = document.querySelector("[data-days]")
const hoursRef = document.querySelector("[data-hours]")
const minutesRef = document.querySelector("[data-minutes]")
const secondsRef = document.querySelector("[data-seconds]")

let selectedDateMs = null
let intervalId = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDateMs = selectedDates[0].getTime()
        const initTime = selectedDateMs - Date.now()

        if (initTime < 0) {
            startBtn.setAttribute("disabled", "")
            Notify.failure('Please choose a date in the future');
            return
        }

        startBtn.removeAttribute("disabled")
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", onStartClick)

function onStartClick() {
    const initTime = selectedDateMs - Date.now()

    timeValidation(initTime)
    // На всякий случай ещё одна проверка, потому что за время между выбором даты и кликом по кнопке выбранная дата может перестать быть будущей

    disableElements()

    setTime(initTime)

    intervalId = setInterval(() => {
        const timeToGo = selectedDateMs - Date.now();

        setTime(timeToGo)
        timerStopper(timeToGo)
    }, 1000);
}

function timeValidation(initTime) {
    if (initTime < 0) {
        startBtn.setAttribute("disabled", "")
        Notify.failure('Please choose a date in the future');
        return
    }
}

function disableElements() {
    startBtn.setAttribute("disabled", "")
    input.setAttribute("disabled", "")
}

function setTime(time) {
    const normalTime = convertMs(time)
    const { days, hours, minutes, seconds } = normalTime;

    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
}

function timerStopper(time) {
    const normalTime = convertMs(time)
    const { days, hours, minutes, seconds } = normalTime;

    const zeroTime = days === "00" && hours === "00" && minutes === "00" && seconds === "00"

    if (zeroTime || time < 0) {
        clearInterval(intervalId)
    }
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

