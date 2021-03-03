const timer = document.querySelector(".timer");
const startStop = document.querySelector(".start-stop");
const reset = document.querySelector(".reset");

const watch = new Stopwatch();

startStop.addEventListener("click", () => {
    if (watch.isStarted) {
        watch.stop();
        startStop.innerHTML = "Start";
    } else {
        watch.start();
        startStop.innerHTML = "Stop";
    }
});

reset.addEventListener("click", () => {
    watch.reset();
});

function Stopwatch() {
    let time = 0;
    let interval;
    let offset;

    this.isStarted = false;

    this.start = function () {
        if (!this.isStarted) {
            interval = setInterval(update, 10);
            offset = Date.now();
            this.isStarted = true;
        }
    };

    this.stop = function () {
        if (this.isStarted) {
            clearInterval(interval);
            interval = null;
            this.isStarted = false;
        }
    };

    this.reset = function () {
        this.stop();
        time = 0;
        const formattedTime = formatTime(time);
        timer.innerHTML = formattedTime;
    };

    function update() {
        time += delta();
        const formattedTime = formatTime(time);
        timer.innerHTML = formattedTime;
    }

    function delta() {
        const now = Date.now();
        const delta = now - offset;
        offset = now;
        return delta;
    }

    function formatTime(timeInMilliseconds) {
        const time = new Date(timeInMilliseconds);
        const milliseconds = time
            .getMilliseconds()
            .toString()
            .substring(0, 2)
            .padStart(2, "0");
        const seconds = time.getSeconds().toString().padStart(2, "0");
        const minutes = time.getMinutes().toString().padStart(2, "0");
        return `${minutes} : ${seconds} : ${milliseconds}`;
    }
}
