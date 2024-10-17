const playbtn = document.getElementsByClassName("play")[0];
const resetbtn = document.getElementsByClassName("reset")[0];
const clearbtn = document.getElementsByClassName("lap-clear-button")[0];
const lapbtn = document.getElementsByClassName("lap")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const minute = document.getElementsByClassName("minute")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isplay = false;
let sec, min, centiSec;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;

const toggleButton = () => {
    resetbtn.classList.remove("hidden");
    lapbtn.classList.remove("hidden");
};

const play = () => {
    if (!isplay) {
        playbtn.innerHTML = 'Pause';
        bg.classList.add("animation-bg");

        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter}:`;
        }, 1000);

        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);

        isplay = true;
    } else {
        playbtn.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isplay = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
};

const reset = () => {
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
    
    isplay = false;
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;

    second.innerHTML = '0 :';
    centiSecond.innerHTML = '&nbsp;0';
    minute.innerHTML = '0 :';

    resetbtn.classList.add("hidden");
    lapbtn.classList.add("hidden");
    playbtn.innerHTML = 'Play';

    lapItem = 0;
    laps.innerHTML = '';
    clearbtn.classList.add("hidden");
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timestamp.setAttribute("class", "time-stamp");

    number.innerHTML = `#${++lapItem}`;
    timestamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timestamp);
    laps.append(li);

    clearbtn.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearbtn);
    clearbtn.classList.add("hidden");
    lapItem = 0;
};

playbtn.addEventListener("click", play);
resetbtn.addEventListener("click", reset);
lapbtn.addEventListener("click", lap);
clearbtn.addEventListener("click", clearAll);