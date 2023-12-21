async function getWeather() {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyiv/today?unitGroup=metric&key=58BUHDRU8S3T4AFJJW7S8R4VV"
  );
  weather = await response.json();
  let { temp, icon } = weather.days[0];
  showWeather(temp, icon);
}

getWeather();

document
  .querySelector(".header__add-user-btn")
  .addEventListener("click", addNewUser);

function showUsers() {
  let users = [];
  if (localStorage.users) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  createUsersList(users);
}

showUsers();

function createUsersList(users) {
  let usersListItems = ``;
  users.forEach((user) => {
    let userItem = createUserItem(user);
    usersListItems += userItem;
  });
  document.querySelector(".header__users__list").innerHTML = usersListItems;
  document
    .querySelectorAll(".header__users__list-item")
    .forEach((user) => user.addEventListener("click", selectUser));
}

function createUserItem(user) {
  return `<li class="header__users__list-item"><div class="header__users__list-item__image-wrapper"><img class="header__users__list-item__image" src="images/user.png" /></div><h3 class="header__users__list-item__name">${user}</h3></li>`;
}

function addNewUser() {
  let users = [];
  let newUser = prompt("Enter your name");
  if (newUser) {
    if (localStorage.users) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    createUsersList(users);
  } else {
    alert("Try again!");
    addNewUser();
  }
}

function selectUser(event) {
  const usersElements = document.querySelectorAll(".header__users__list-item");
  for (let i = 0; i < usersElements.length; i++) {
    if (usersElements[i].textContent === event.currentTarget.textContent) {
      usersElements[i].classList.add("header__users__list-item--selected");
    } else {
      usersElements[i].classList.remove("header__users__list-item--selected");
    }
  }
  localStorage.setItem("selectedUser", event.currentTarget.textContent);
  greetUser();
}

function greetUser() {
  const name = localStorage.selectedUser;
  const greetingElement = document.querySelector(".header__greeting");
  greetingElement.textContent = `Hello, ${name}!`;
}

function showWeather(temp, icon) {
  const container = document.querySelector(".header__weather");
  const weather = `<img class="header__weather-icon" src="images/weather-icons/${icon}.png" /><p class="header__weather-temp">${temp}°C</p>`;
  container.innerHTML = weather;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function showDate() {
  const container = document.querySelector(".header__date");
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const day = now.getDay();
  const currentDate = `<img class="header__date-icon" src="images/calendar.png" /><p class="header__date-value">${
    weekDays[day - 1]
  }, ${months[month]} ${date}th</p>`;
  container.innerHTML = currentDate;
}

showDate();
