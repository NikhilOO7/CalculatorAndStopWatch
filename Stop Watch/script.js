// Set current date in the date picker
const currentDate = new Date().toJSON().slice(0, 10);
datePicker.value = currentDate;

// Restrict the date picker to past and future dates
const minDate = new Date().toJSON().slice(0, 10);
datePicker.setAttribute('min', minDate);

const timerLabel = document.getElementById('timerLabel');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
let interval;
let seconds = 0;
let minutes = 0;
let hours = 0;

const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
};

const startTimer = () => {
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        timerLabel.textContent = formattedTime;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
};

const resetTimer = () => {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerLabel.textContent = '00:00:00';
};

startButton.addEventListener('click', () => {
    startTimer();
});

stopButton.addEventListener('click', () => {
    stopTimer();
});

resetButton.addEventListener('click', () => {
    resetTimer();
});
