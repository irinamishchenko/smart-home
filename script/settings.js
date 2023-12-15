const devicesList = document.querySelector(".settings__header__devices-list");
const title = document.querySelector(".settings__header--title");
const batteryIndex = document.querySelector(".settings__header--battery");
const switcher = document.querySelector(".switcher");
const switcherBackground = document.querySelector(".switcher-background");
const switcherButton = document.querySelector(".switcher-button");

switcher.addEventListener("click", switchDevicePower);

// let chosenDevice;

// function setChosenDevice() {
//   chosenDevice = JSON.parse(localStorage.rooms)
//     .find((room) => room.title === localStorage.selectedRoom)
//     .devices.find((device) => device.title === localStorage.selectedDevice);
// }

const rooms = JSON.parse(localStorage.rooms);

class Device {
  battery = Math.floor(Math.random() * 100) + 1;
  timer;
  //   functions = [];
  constructor(isOn, title, imageUrl) {
    this.isOn = isOn;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  changeBattery() {
    if (this.timer > 0) {
      clearInterval(this.timer);
      this.timer = "undefined";
    } else {
      this.timer = setInterval(() => {
        if (this.battery === 1) {
          clearInterval(this.timer);
        }
        this.battery -= 1;
        console.log(this.battery);
      }, 3600000);
    }
  }
  set functions(functionsArray) {
    this.functions = functionsArray;
  }
}

const devices = JSON.parse(localStorage.rooms)
  .find((room) => room.title === localStorage.selectedRoom)
  .devices.map((device) => {
    let newDevice;
    let isOn = device.isOn;
    if (!isOn) {
      newDevice = new Device(device.isOn, device.title, device.imageUrl);
    } else {
      newDevice = new Device(device.isOn, device.title, device.imageUrl);
      newDevice.changeBattery();
    }
    return newDevice;
  });

if (devices.length > 1) {
  showDevices();
}

function changeTitle() {
  title.textContent = localStorage.selectedDevice
    .split("-")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}

function changeChargePercentage() {
  batteryIndex.textContent = `${
    devices.find((device) => device.title === localStorage.selectedDevice)
      .battery
  } %`;
}

// setChosenDevice();
changeTitle();
changeChargePercentage();

function showDevices() {
  let devicesListItems = ``;
  for (let i = 0; i < devices.length; i++) {
    const title = devices[i].title
      .split("-")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
    let item = `<li class="devices__header__list-item" data-device="${devices[i].title}">${title}</li>`;
    devicesListItems += item;
  }
  devicesList.innerHTML = devicesListItems;
  devicesList.childNodes.forEach((device) =>
    device.addEventListener("click", setSelectedDevice)
  );
  setSelectedDevice();
}

function setSelectedDevice(event) {
  let selectedDevice;
  if (!event) {
    selectedDevice = localStorage.selectedDevice;
  } else {
    selectedDevice = event.target.dataset.device;
  }
  localStorage.setItem("selectedDevice", selectedDevice);
  for (let i = 0; i < devicesList.childNodes.length; i++) {
    if (devicesList.childNodes[i].dataset.device === selectedDevice) {
      devicesList.childNodes[i].classList.add(
        "devices__header__list-item--selected"
      );
    } else {
      devicesList.childNodes[i].classList.remove(
        "devices__header__list-item--selected"
      );
    }
  }
  //   setChosenDevice();
  changeSwitcherStyles();
  changeTitle();
  changeChargePercentage();
}

function switchDevicePower() {
  rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find(
      (device) => device.title === localStorage.selectedDevice
    ).isOn = !rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find((device) => device.title === localStorage.selectedDevice)
    .isOn;
  localStorage.setItem("rooms", JSON.stringify(rooms));
  changeSwitcherStyles();
  devices
    .find((device) => device.title === localStorage.selectedDevice)
    .changeBattery();
  //   changeBattery(
  //     devices.find((device) => device.title === localStorage.selectedDevice)
  //   );
}

function changeSwitcherStyles() {
  if (
    rooms
      .find((room) => room.title === localStorage.selectedRoom)
      .devices.find((device) => device.title === localStorage.selectedDevice)
      .isOn
  ) {
    switcherBackground.style.background =
      "linear-gradient(#0051e3 0%, #0adff4 100%)";
    switcherBackground.style.borderColor = "transparent";
    switcherButton.classList.add("switcher-button--active");
    switcherButton.classList.remove("switcher-button");
  } else {
    switcherBackground.style.background =
      "linear-gradient(180deg, #bdbdbd 0%, #dfe0e4 100%)";
    switcherBackground.style.borderColor = "#fff";
    switcherButton.classList.add("switcher-button");
    switcherButton.classList.remove("switcher-button--active");
  }
}

// if (JSON.parse(localStorage.rooms).length > 0) {
//   // changeTitle();
//   rooms = JSON.parse(localStorage.rooms);
//   showRooms();
// }
