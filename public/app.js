const elemets = {
  timer: document.querySelector(".timer"),
  form: document.querySelector("form"),
  start: document.querySelector(".start-btn"),
  stop: document.querySelector(".stop-btn"),
  reset: document.querySelector(".reset-btn"),
  set: document.querySelector(".set-btn"),
};

const setTimer = (hoursValue, minutesValue, secondsValue) => {
  let hours = hoursValue;
  let min = minutesValue;
  let sec = secondsValue;
  hours < 10 ? (hours = "0" + hours) : (hours = hours);
  min < 10 ? (min = "0" + min) : (min = min);
  sec < 10 ? (sec = "0" + sec) : (sec = sec);
  elemets.timer.innerHTML = `${hours}:${min}:${sec}`;
};
elemets.start.addEventListener("click", () => {}); // TODO: start timer

elemets.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elemets.form);
  const hours = formData.get("hours-input");
  console.log(hours);
  const min = formData.get("minutes-input");
  console.log(min);
  const sec = formData.get("seconds-input");
  console.log(sec);
  const time = hours * 3600 + min * 60 + sec;
  console.log(time);
  setTimer(hours, min, sec);
});
