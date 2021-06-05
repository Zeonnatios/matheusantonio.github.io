const daysContainer = document.getElementById('days');
const hoursContainer = document.getElementById('hours');
const minutesContainer = document.getElementById('minutes');
const secondsContainer = document.getElementById('seconds');

const nextBirthdayYear = () => {
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const birthdayDate = new Date(`21 october ${currentYear} 00:00:00`);
  if (currentDate > birthdayDate) {
    console.log(currentYear + 1);
    return currentYear + 1;
  }
  return currentYear;
};

const nextYear = nextBirthdayYear();
const birthdayDate = new Date(`21 october ${nextYear} 00:00:00`);

const getTimeUnit = (unit) => (unit < 10 ? '0' + unit : unit);

const insertDate = ({ days, hours, minutes, seconds }) => {
  daysContainer.innerHTML = getTimeUnit(days);
  hoursContainer.innerHTML = getTimeUnit(hours);
  minutesContainer.innerHTML = getTimeUnit(minutes);
  secondsContainer.innerHTML = getTimeUnit(seconds);
};

const updateCountdown = () => {
  const currentDate = new Date();
  const difference = birthdayDate - currentDate;
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  insertDate({ days, hours, minutes, seconds });
};

setInterval(updateCountdown, 1000);
