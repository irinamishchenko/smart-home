const devicesList = document.querySelector(".settings__header__devices-list");
const title = document.querySelector(".settings__header--title");
const batteryIndex = document.querySelector(".settings__header--battery");
const switcher = document.querySelector(".switcher");
const switcherBackground = document.querySelector(".switcher-background");
const switcherButton = document.querySelector(".switcher-button");
const main = document.querySelector(".settings__main");
// let lampColorsControls;

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
        changeChargePercentage();
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
  setDeviceSettingsMarkup();
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

function setDeviceSettingsMarkup() {
  const container = document.querySelector(".main__device-settings");
  let deviceSettingsMarkup;
  switch (localStorage.selectedDevice) {
    case "light":
      deviceSettingsMarkup = `<div class="lamp"><div class="lamp__img-container"><img class="lamp-img" src="../images/settings/lamp.png" /><svg class="lamp-icon"><use xlink:href="../images/sprite.svg#lamp-light"></use></svg></div><div class="lamp__settings"><section class="lamp__settings__colors"><h3 class="lamp__settings__colors-title">Colors</h3><div class="lamp__settings__colors__buttons"><button class="lamp__settings__colors__button button-blue" data-color="#254bec"></button><button class="lamp__settings__colors__button button-white" data-color="#fff"></button><button class="lamp__settings__colors__button button-yellow" data-color="#ffc600"></button></div></section><section class="lamp__settings__brightness"><h3 class="lamp__settings__brightness-title">Brightness</h3><div class="lamp__settings__brightness-controls"><button class="lamp__settings__brightness-less"><svg class="controls-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><p class="lamp__settings__brightness-info">50%</p><button class="lamp__settings__brightness-more"><svg class="controls-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></section></div></div>`;
      //   device.innerHTML = deviceSettingsMarkup;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".lamp__settings__colors__button")
        .forEach((button) =>
          button.addEventListener("click", setSelectedLampColor)
        );
      setSelectedLampColor();
      document
        .querySelectorAll(".lamp__settings__brightness-controls button")
        .forEach((button) =>
          button.addEventListener("click", changeLampBrightness)
        );
      break;
    case "air-condition":
      deviceSettingsMarkup = `<div class="condition"><div class="condition__value-container"><div class="condition__value"><h3 class="condition__value-temp">24°C</h3></div><div class="condition__controls"><button class="condition__controls-button-less"><svg class="condition__controls-button-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><button class="condition__controls-button-more"><svg class="condition__controls-button-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></div><div class="condition-modes"><div class="condition-mode mode-cool"><svg class="condition-mode-icon cool-icon"><use xlink:href="../images/sprite.svg#cool"></use></svg><h4>Cool</h4></div><div class="condition-mode mode-hot"><svg class="condition-mode-icon hot-icon"><use xlink:href="../images/sprite.svg#hot"></use></svg><h4>Hot</h4></div><div class="condition-mode mode-auto"><svg class="condition-mode-icon auto-icon"><use xlink:href="../images/sprite.svg#auto"></use></svg><h4>Auto</h4></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      break;

    default:
      break;
  }
}

setDeviceSettingsMarkup();

function setSelectedLampColor(event) {
  let selectedColor;
  const buttons = document.querySelectorAll(".lamp__settings__colors__button");

  if (!event) {
    selectedColor = "#fff";
  } else {
    selectedColor = event.target.dataset.color;
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.color === selectedColor) {
      buttons[i].classList.add("lamp__settings__colors__button--selected");
    } else {
      buttons[i].classList.remove("lamp__settings__colors__button--selected");
    }
  }
  document.querySelector(".lamp-icon").style.fill = selectedColor;
}

function changeLampBrightness(event) {
  const brightnessInfo = document.querySelector(
    ".lamp__settings__brightness-info"
  );
  let brightnessValue = parseInt(brightnessInfo.textContent);
  const lessButton = document.querySelector(".lamp__settings__brightness-less");
  const moreButton = document.querySelector(".lamp__settings__brightness-more");
  const lightIcon = document.querySelector(".lamp-icon");
  if (brightnessValue === 99) {
    moreButton.disabled = true;
  } else if (brightnessValue === 1) {
    lessButton.disabled = true;
  } else {
    moreButton.disabled = false;
    lessButton.disabled = false;
  }
  if (
    event.currentTarget.classList.value === "lamp__settings__brightness-less"
  ) {
    brightnessValue -= 1;
  } else {
    brightnessValue += 1;
  }
  brightnessInfo.textContent = brightnessValue + "%";
  lightIcon.style.opacity = `0.${brightnessValue}`;
}
