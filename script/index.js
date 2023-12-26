import { changeMenuItem } from "./footer.js";

localStorage.setItem("menuItem", "home");

changeMenuItem();

const rooms = JSON.parse(localStorage.getItem("rooms"));

function showActiveDevices() {
  const activeDevicesList = document.querySelector(".active-devices__list");
  let activeDevicesItems = ``;
  rooms.forEach((room) => {
    for (let i = 0; i < room.devices.length; i++) {
      if (room.devices[i].isOn) {
        let title = room.devices[i].title.split("-").join(" ");
        let item = `<li class="active-devices__list-item"><h3 class="active-devices__list-item-title">${title}/<span class="active-devices__list-item-room">${room.title}</span></h3><div class="active-devices__list-item__switcher--active"><div class="active-devices__list-item__switcher-bg"></div><div class="active-devices__list-item__switcher-btn"></div></div></li>`;
        activeDevicesItems += item;
      }
    }
  });
  activeDevicesList.innerHTML = activeDevicesItems;
  document
    .querySelectorAll(".active-devices__list-item__switcher--active")
    .forEach((button) => button.addEventListener("click", switchDevice));
  changeTitle();
}

function changeTitle() {
  const activeDevicesList = document.querySelector(".active-devices__list");
  const title = document.querySelector(".active-devices__title");
  if (activeDevicesList.children.length === 0) {
    title.textContent = "All your devices are off";
  } else {
    title.textContent = "Active devices";
  }
}

changeTitle();
showActiveDevices();

function switchDevice(event) {
  const selectedDevice = event.currentTarget.parentNode.textContent
    .split("/")[0]
    .split(" ")
    .join("-");
  const selectedRoom = event.currentTarget.parentNode.textContent.split("/")[1];

  rooms
    .find((room) => room.title === selectedRoom)
    .devices.find((device) => device.title === selectedDevice).isOn = !rooms
    .find((room) => room.title === selectedRoom)
    .devices.find((device) => device.title === selectedDevice).isOn;
  localStorage.setItem("rooms", JSON.stringify(rooms));
  changeSwitcherStyles(selectedDevice);
}

function changeSwitcherStyles(selectedDevice) {
  const activeDevicesItems = document.querySelectorAll(
    ".active-devices__list-item"
  );
  activeDevicesItems.forEach((button) => {
    if (
      button.textContent.split("/")[0].split(" ").join("-") === selectedDevice
    ) {
      button.lastChild.firstChild.style.background =
        "linear-gradient(180deg, #bdbdbd 0%, #dfe0e4 100%)";
      button.lastChild.lastChild.style.left = "0";
    }
  });
}
