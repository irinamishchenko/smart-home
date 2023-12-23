// async function getWeather() {
//   const response = await fetch(
//     "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyiv/today?unitGroup=metric&key=58BUHDRU8S3T4AFJJW7S8R4VV"
//   );
//   weather = await response.json();
//   let { temp, icon } = weather.days[0];
//   showWeather(temp, icon);
// }

// getWeather();

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
  selectUser();
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
  let selectedUser;
  if (event) {
    selectedUser = event.currentTarget.textContent;
  } else {
    selectedUser = localStorage.selectedUser;
  }
  for (let i = 0; i < usersElements.length; i++) {
    if (usersElements[i].textContent === selectedUser) {
      usersElements[i].classList.add("header__users__list-item--selected");
    } else {
      usersElements[i].classList.remove("header__users__list-item--selected");
    }
  }
  localStorage.setItem("selectedUser", selectedUser);
  greetUser();
}

function greetUser() {
  const name = localStorage.selectedUser;
  const greetingElement = document.querySelector(".header__greeting");
  if (name !== "undefined") {
    greetingElement.textContent = `Hello, ${name}!`;
  } else {
    greetingElement.textContent = `Hello!`;
  }
}

selectUser();

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

// const rooms = JSON.parse(localStorage.getItem("rooms"));

// function showActiveDevices() {
//   const activeDevicesList = document.querySelector(".active-devices__list");
//   let activeDevicesItems = ``;
//   rooms.forEach((room) => {
//     for (let i = 0; i < room.devices.length; i++) {
//       if (room.devices[i].isOn) {
//         let title = room.devices[i].title.split("-").join(" ");
//         let item = `<li class="active-devices__list-item"><h3 class="active-devices__list-item-title">${title}/<span class="active-devices__list-item-room">${room.title}</span></h3><div class="active-devices__list-item__switcher--active"><div class="active-devices__list-item__switcher-bg"></div><div class="active-devices__list-item__switcher-btn"></div></div></li>`;
//         activeDevicesItems += item;
//       }
//     }
//   });
//   activeDevicesList.innerHTML = activeDevicesItems;
//   document
//     .querySelectorAll(".active-devices__list-item__switcher--active")
//     .forEach((button) => button.addEventListener("click", switchDevice));
//   changeTitle(activeDevicesList);
// }

// function changeTitle(activeDevicesList) {
//   const title = document.querySelector(".active-devices__title");
//   if (activeDevicesList.children.length === 0) {
//     title.textContent = "All your devices are off";
//   } else {
//     title.textContent = "Active devices";
//   }
// }

// showActiveDevices();

// function switchDevice(event) {
//   const selectedDevice = event.currentTarget.parentNode.textContent
//     .split("/")[0]
//     .split(" ")
//     .join("-");
//   const selectedRoom = event.currentTarget.parentNode.textContent.split("/")[1];

//   rooms
//     .find((room) => room.title === selectedRoom)
//     .devices.find((device) => device.title === selectedDevice).isOn = !rooms
//     .find((room) => room.title === selectedRoom)
//     .devices.find((device) => device.title === selectedDevice).isOn;
//   localStorage.setItem("rooms", JSON.stringify(rooms));
//   changeSwitcherStyles(selectedDevice);
// }

// function changeSwitcherStyles(selectedDevice) {
//   const activeDevicesItems = document.querySelectorAll(
//     ".active-devices__list-item"
//   );
//   activeDevicesItems.forEach((button) => {
//     if (
//       button.textContent.split("/")[0].split(" ").join("-") === selectedDevice
//     ) {
//       button.lastChild.firstChild.style.background =
//         "linear-gradient(180deg, #bdbdbd 0%, #dfe0e4 100%)";
//       button.lastChild.lastChild.style.left = "0";
//     }
//   });
// }
