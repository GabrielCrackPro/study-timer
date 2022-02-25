const elements = {
  timer: document.querySelector(".timer"),
  form: document.querySelector("form"),
  start: document.querySelector(".start-btn"),
  stop: document.querySelector(".stop-btn"),
  reset: document.querySelector(".reset-btn"),
  set: document.querySelector(".set-btn"),
  add: document.querySelector(".save-btn"),
  defaultTimers: document.querySelectorAll(".default-timers"),
};

let savedTimers = [];
const setTimer = (hoursValue, minutesValue, secondsValue) => {
  let hours = hoursValue;
  let min = minutesValue;
  let sec = secondsValue;
  let timer = `${hours}:${min}:${sec}`;
  elements.timer.innerHTML = timer;
  savedTimers.push(timer);
  saveTimer(savedTimers);
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
  clearInterval(interval);
});
elements.add.addEventListener("click", () => {
  const button = document.createElement("button");
  button.innerText = elements.timer.textContent;
  button.classList.add("btn", "btn-dark");
  elements.defaultTimers[0].appendChild(button);
});

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elements.form);
  const hours = formData.get("hours-input");
  const min = formData.get("minutes-input");
  const sec = formData.get("seconds-input");
  if (hours === "" && min === "" && sec === "") {
    hours = 0;
    min = 0;
    sec = 0;
  } else {
    setTimer(hours, min, sec);
  }
  elements.form.reset();
});
elements.defaultTimers.forEach((timer) => {
  timer.addEventListener("click", (e) => {
    const value = e.target.innerText;
    setTimer(value.split(":")[0], value.split(":")[1], value.split(":")[2]);
  });
});

const saveTimer = (savedTimersArray) => {
  localStorage.setItem("timers", [savedTimersArray]);
};
window.onload = () => {
  if (localStorage.getItem("timers")) {
    savedTimers = JSON.parse(localStorage.getItem("timers"));
    savedTimers.forEach((timer) => {
      const button = document.createElement("button");
      button.innerText = timer;
      button.classList.add("btn", "btn-dark");
      elements.defaultTimers[0].appendChild(button);
    });
  }
};
