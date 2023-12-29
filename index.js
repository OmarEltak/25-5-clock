// <button id="Break-minus-element">-</button>
// <span id="Break-session-element">5</span>
// <button id="Break-plus-element">+</button>
// <h2>Session length</h2>
// <button id="session-minus-element">-</button>
// <span id="session-element">25</span>
// <button id="session-plus-element">+</button>
let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
let isSessionMode = true;
let sessionTimer;
let breakTimer;

const TWENTYFIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 * 60;
const breakMinusElement = document.getElementById("Break-minus-element");
const breakSessionElement = document.getElementById("Break-session-element");
const breakPlusElement = document.getElementById("Break-plus-element");
const sessionMinusElement = document.getElementById("session-minus-element");
const sessionElement = document.getElementById("session-element");
const sessionPlusElement = document.getElementById("session-plus-element");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const playButton = document.getElementById("play-button")
const pauseButton = document.getElementById("pause-button")
const resetButton = document.getElementById("reset-button")
const title = document.getElementById("title")

reset();

function updateUiTimer(length) {
    if (Math.floor(length / 60).toString().length === 1) {
        timerMinutes.textContent = "0" + Math.floor(length / 60)

    } else {
        timerMinutes.textContent = Math.floor(length / 60)
    }
    if ((length % 60).toString().length === 1) {
        timerSeconds.textContent = "0" + (length % 60)
    } else {
        timerSeconds.textContent = length % 60
    }
}

function reset() {
    isSessionMode = true;
    breakSessionLength = FIVE_MINUTES;
    sessionLength = TWENTYFIVE_MINUTES;
    breakSessionElement.textContent = FIVE_MINUTES / 60;
    sessionElement.textContent = TWENTYFIVE_MINUTES / 60;
    clearInterval(sessionTimer);
    timerMinutes.textContent = "25";
    timerSeconds.textContent = "00";

}

function startBreak() {
    clearInterval(sessionTimer)
    isSessionMode = false;
    title.textContent = "Break"
    breakTimer = setInterval(() => {
            breakSessionLength -= 1;
            updateUiTimer(breakSessionLength);
            if (breakSessionLength === 0) {
                sessionLength = parseInt(sessionElement.textContent, 10) * 60;
                updateUiTimer(sessionLength);

                startSession();
            }
        },
        1000)
}

function startSession() {

    sessionTimer = setInterval(() => {
        clearInterval(breakTimer)
        isSessionMode = true;
        title.textContent = "Session"
        sessionLength -= 1;
        updateUiTimer(sessionLength);
        if (sessionLength === 0) {
            breakSessionLength = parseInt(breakSessionElement.textContent, 10) * 60;

            updateUiTimer(breakSessionLength);
            startBreak();
        }
    }, 1000);
}

playButton.addEventListener("click", () => {
    if (isSessionMode) { startSession(); } else { startBreak(); }
})
pauseButton.addEventListener("click", () => {
    if (isSessionMode) { clearInterval(sessionTimer) }

})

resetButton.addEventListener("click", () => {
    reset();
})

breakMinusElement.addEventListener("click", () => {
    if (breakSessionLength - 60 === 0) { return }
    breakSessionLength -= 60;
    breakSessionElement.textContent = breakSessionLength / 60
});

breakPlusElement.addEventListener("click", () => {
    breakSessionLength += 60;
    breakSessionElement.textContent = breakSessionLength / 60
});
sessionMinusElement.addEventListener("click", () => {
    if (sessionLength - 60 === 0) { return }
    sessionLength -= 60;
    sessionElement.textContent = sessionLength / 60
    if (isSessionMode) { timerMinutes.textContent = sessionLength / 60 }
});
sessionPlusElement.addEventListener("click", () => {
    sessionLength += 60;
    sessionElement.textContent = sessionLength / 60
    if (isSessionMode) { timerMinutes.textContent = sessionLength / 60 }
});