const elements = {
  timer: document.querySelector(".timer"),
  form: document.querySelector("form"),
  start: document.querySelector(".start-btn"),
  stop: document.querySelector(".stop-btn"),
  reset: document.querySelector(".reset-btn"),
  set: document.querySelector(".set-btn"),
  defaultTimers: document.querySelectorAll(".default-timers"),
};

const setTimer = (hoursValue, minutesValue, secondsValue) => {
  let hours = hoursValue;
  let min = minutesValue;
  let sec = secondsValue;
  hours < 10 ? (hours = "0" + hours) : (hours = hours);
  min < 10 ? (min = "0" + min) : (min = min);
  sec < 10 ? (sec = "0" + sec) : (sec = sec);
  let timer = `${hours}:${min}:${sec}`;
  elements.timer.innerHTML = timer;
  saveTimer(timer);
};
let interval;
elements.start.addEventListener("click", () => {
  interval = setInterval(() => {
    let hours = parseInt(elements.timer.innerHTML.split(":")[0]);
    let min = parseInt(elements.timer.innerHTML.split(":")[1]);
    let sec = parseInt(elements.timer.innerHTML.split(":")[2]);
    sec--;
    if (sec < 0) {
      sec = 59;
      min--;
    }
    if (min < 0) {
      min = 59;
      hours--;
    }
    if (hours < 0) {
      hours = 0;
      min = 0;
      sec = 0;
    }
    setTimer(hours, min, sec);
  }, 1000);
});

elements.reset.addEventListener("click", () => {
  clearInterval(interval);
  setTimer(0, 0, 0);
});
elements.stop.addEventListener("click", () => {
  // stop the timer
  clearInterval(interval);
});

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elements.form);
  const hours = formData.get("hours-input");
  const min = formData.get("minutes-input");
  const sec = formData.get("seconds-input");
  setTimer(hours, min, sec);
  elements.form.reset();
});
elements.defaultTimers.forEach((timer) => {
  timer.addEventListener("click", (e) => {
    const value = e.target.innerText;
    setTimer(value.split(":")[0], value.split(":")[1], value.split(":")[2]);
  });
});

const saveTimer = (timer) => {
  localStorage.setItem("timer", timer);
};
