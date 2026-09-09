let seconds = 0;

const timeElement = document.querySelector(".time");

function updateTime() {
    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minuteText = String(minutes).padStart(2, "0");
    const secondText = String(remainingSeconds).padStart(2, "0");

    timeElement.textContent =
        `${minuteText}:${secondText}`;
}

setInterval(updateTime, 1000);
