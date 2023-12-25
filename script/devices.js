import { changeMenuItem } from "./footer.js";

let rooms = [];

const title = document.querySelector(".devices__header--title");
const roomsList = document.querySelector(".devices__header__list");
const addDeviceBtn = document.querySelector(".devices__add-button");
const addDeviceModalWrapper = document.querySelector(".devices__modal-wrapper");
const cancelDeviceBtn = document.querySelector(".devices__modal__btn-cancel");
const chooseDeviceButtons = document.querySelectorAll(
  ".devices__list-item__button"
);
const devicesList = document.querySelector("#devices-list");
addDeviceBtn.addEventListener("click", openAddDeviceModal);
cancelDeviceBtn.addEventListener("click", closeAddDeviceModal);

localStorage.setItem("menuItem", "devices");

changeMenuItem();

if (JSON.parse(localStorage.rooms).length > 0) {
  rooms = JSON.parse(localStorage.rooms);
  showRooms();
}

function showRooms() {
  let roomsListItems = ``;
  for (let i = 0; i < rooms.length; i++) {
    let item = `<li class="devices__header__list-item" data-room="${rooms[i].title}">${rooms[i].title}</li>`;
    roomsListItems += item;
  }
  roomsList.innerHTML = roomsListItems;
  roomsList.childNodes.forEach((room) =>
    room.addEventListener("click", setSelectedRoom)
  );
  setSelectedRoom();
}

function setSelectedRoom(event) {
  let selectedRoom;
  if (!event) {
    selectedRoom = localStorage.selectedRoom;
  } else {
    selectedRoom = event.target.dataset.room;
  }
  localStorage.setItem("selectedRoom", selectedRoom);
  for (let i = 0; i < roomsList.childNodes.length; i++) {
    if (roomsList.childNodes[i].dataset.room === selectedRoom) {
      roomsList.childNodes[i].classList.add(
        "devices__header__list-item--selected"
      );
    } else {
      roomsList.childNodes[i].classList.remove(
        "devices__header__list-item--selected"
      );
    }
  }
  showDevices();
}

function openAddDeviceModal() {
  addDeviceModalWrapper.style.display = "block";
  chooseDeviceButtons.forEach((button) =>
    button.addEventListener("click", addDevice)
  );
}

function closeAddDeviceModal() {
  addDeviceModalWrapper.style.display = "none";
}

function addDevice(event) {
  let chosenDevise = event.target.parentNode.children[1].innerText
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  try {
    checkDeviceTitle(chosenDevise);
    const imageUrl = setImageUrl(chosenDevise);
    const device = createDevice(chosenDevise, imageUrl);
    console.log(device);
    rooms
      .find((room) => room.title === localStorage.selectedRoom)
      .devices.push(device);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    closeAddDeviceModal();
    showDevices();
  } catch (error) {
    alert(error.message);
  }
}

function createDevice(title, imageUrl) {
  return { isOn: false, title, imageUrl };
}

function showDevices() {
  let devicesListItems = ``;
  const devicesForRoom = rooms.find(
    (room) => room.title === localStorage.selectedRoom
  ).devices;
  if (devicesForRoom.length > 0) {
    changeTitle();
  }
  for (let i = 0; i < devicesForRoom.length; i++) {
    const title = setTitle(devicesForRoom[i].title);
    const newDevice = `<li class="devices__list-item"><div class="devices__list-item__image-wrapper"><img class="devices__list-item__image" src="${devicesForRoom[i].imageUrl}" alt="${title}" /></div><h2 class="devices__list-item__title">${title}</h2><div data-device="${title}" class="devices__list-item__buttons"><a href="./settings.html" class="devices__list-item__button-details">Details</a><button class="devices__list-item__button-delete">Delete</button></div></li>`;
    devicesListItems += newDevice;
  }
  devicesList.innerHTML = devicesListItems;
  document
    .querySelectorAll(".devices__list-item__button-details")
    .forEach((button) => button.addEventListener("click", setDeviceName));
  document
    .querySelectorAll(".devices__list-item__button-delete")
    .forEach((button) => button.addEventListener("click", deleteDevice));
}

function changeTitle() {
  title.textContent = "Your Devices";
}

function setImageUrl(title) {
  return `../images/devices/${title}.png`;
}

function setTitle(title) {
  return title
    .split("-")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}

function checkDeviceTitle(title) {
  const titles = [];
  rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.forEach((device) => titles.push(device.title));
  if (titles.includes(title)) {
    throw new Error("You already have this device in your room");
  }
}

function setDeviceName(event) {
  const chosenDevice = event.target.parentNode.dataset.device
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  localStorage.setItem("selectedDevice", chosenDevice);
}

function deleteDevice(event) {
  const chosenDevice = event.target.parentNode.dataset.device
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  const roomDevices = rooms.find(
    (room) => room.title === localStorage.selectedRoom
  ).devices;
  const filteredDevices = roomDevices.filter(
    (device) => device.title !== chosenDevice
  );

  rooms.find((room) => room.title === localStorage.selectedRoom).devices =
    filteredDevices;
  localStorage.setItem("rooms", JSON.stringify(rooms));
  showDevices();
}
