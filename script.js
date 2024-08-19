let startTime = 0;
let endTime = 0;
let lapTimes = [];
let isRunning = false;
let intervalId;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const clearButton = document.getElementById('clear-btn');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
clearButton.addEventListener('click', clearLaps);

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime();
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
    intervalId = setInterval(() => {
      updateStopwatch();
    }, 1000);
  }
}

function stopStopwatch() {
  if (isRunning) {
    endTime = new Date().getTime();
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    clearInterval(intervalId);
  }
}

function resetStopwatch() {
  startTime = 0;
  endTime = 0;
  lapTimes = [];
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  lapList.innerHTML = '';
}

function lapStopwatch() {
  if (isRunning) {
    const lapTime = new Date().getTime() - startTime;
    lapTimes.push(lapTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = formatTime(lapTime);
    lapList.appendChild(lapElement);
  }
}

function clearLaps() {
  lapTimes = [];
  lapList.innerHTML = '';
}

function updateStopwatch() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  hoursElement.textContent = pad(hours);
  minutesElement.textContent = pad(minutes);
  secondsElement.textContent = pad(seconds);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}