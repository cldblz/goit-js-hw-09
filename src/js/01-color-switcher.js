const startBtn = document.querySelector("[data-start]")
const stopBtn = document.querySelector("[data-stop]")

let intervalId = null

startBtn.addEventListener("click", onStartClick)
stopBtn.addEventListener("click", onStopClick)

function onStartClick() {
    startBtn.setAttribute("disabled", "")
    stopBtn.removeAttribute("disabled")

    document.body.style.backgroundColor = getRandomHexColor();

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopClick() {
    stopBtn.setAttribute("disabled", "")
    startBtn.removeAttribute("disabled")

    clearInterval(intervalId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

