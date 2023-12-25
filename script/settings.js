import { changeMenuItem } from "./footer.js";
import {
  changeValue,
  changeMode,
  setSelectedLampColor,
  changeLampBrightness,
  makeCoffee,
  setSelectedProrgamm,
  toggleOvenLight,
  changeWashingMode,
  changeDoorStatus,
  checkPasswordPresence,
} from "./deviceFunctions.js";
import { Device } from "./classes.js";

const devicesList = document.querySelector(".settings__header__devices-list");
const title = document.querySelector(".settings__header--title");
const batteryIndex = document.querySelector(".settings__header--battery");
const switcher = document.querySelector(".switcher");
const switcherBackground = document.querySelector(".switcher-background");
const switcherButton = document.querySelector(".switcher-button");
const main = document.querySelector(".settings__main");

localStorage.setItem("menuItem", "settings");

changeMenuItem();

switcher.addEventListener("click", switchDevicePower);

const rooms = JSON.parse(localStorage.rooms);

function setDevices() {
  devices = JSON.parse(localStorage.rooms)
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
      const functions = setDeviceFunctions(newDevice);
      newDevice.setFunctions(functions);
      return newDevice;
    });
  rooms.find((room) => room.title === localStorage.selectedRoom).devices =
    devices;
  localStorage.setItem("rooms", JSON.stringify(rooms));
}

let devices = [];
setDevices();

if (devices.length > 0) {
  showDevices();
}

function setDeviceFunctions(device) {
  let functions;
  switch (device.title) {
    case "air-condition":
      functions = { temp: 24, modes: ["cool", "hot", "auto"] };
      break;
    case "air-purifier":
      functions = { power: [1, 2, 3] };
      break;
    case "cleaner-robot":
      functions = { power: [1, 2, 3], modes: ["wet", "dry"] };
      break;
    case "coffee-machine":
      functions = {
        modes: ["Cappuccino", "Cocoa", "Latte", "Espresso", "Black Coffee"],
      };
      break;
    case "fan":
      functions = { power: [1, 2, 3] };
      break;
    case "fridge":
      functions = { power: [1, 2, 3] };
      break;
    case "griller":
      functions = { modes: ["Meat", "Fish", "Veggies", "Shrimps"] };
      break;
    case "heater-machine":
      functions = { power: [1, 2, 3] };
      break;
    case "light":
      functions = { colors: ["blue", "white", "yellow"], brightness: 50 };
      break;
    case "loud":
      functions = { volume: 50 };
      break;
    case "microwave-oven":
      functions = { power: 600, time: 5 };
      break;
    case "rice-cooker":
      functions = {
        modes: ["Rice", "Soup", "Oatmeal", "Slow cook", "Reheat", "Warm"],
      };
      break;
    case "smart-door":
      functions = { password: null, isOpen: false };
      break;
    case "oven":
      functions = {
        modes: ["Pizza", "Convection", "Bottom", "Grill", "Fan Grill"],
        temp: 180,
        light: false,
      };
      break;
    case "tv":
      functions = {
        programms: [
          "Discovery",
          "Fox",
          "ICTV",
          "Euronews",
          "MTV",
          "Eurosport",
          "FilmBox",
        ],
        volume: 50,
        selectedProgramm: null,
      };
      break;
    case "washing-machine":
      functions = {
        modes: [
          "Hand Wash",
          "Quick Wash",
          "Sport",
          "Cotton",
          "Soft Wash",
          "Shoes",
        ],
      };
      break;

    default:
      break;
  }
  return functions;
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

changeTitle();

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
  const device = rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find((device) => device.title === localStorage.selectedDevice);
  let { title, functions } = device;
  switch (localStorage.selectedDevice) {
    case "light":
      deviceSettingsMarkup = `<div class="lamp"><div class="lamp__img-container"><img class="lamp-img" src="../images/settings/lamp.png" /><svg class="lamp-icon"><use xlink:href="../images/sprite.svg#lamp-light"></use></svg></div><div class="lamp__settings"><section class="lamp__settings__colors"><h3 class="lamp__settings__colors-title settings-subtitle">Colors</h3><div class="lamp__settings__colors__buttons"><button class="lamp__settings__colors__button button-blue" data-color="#254bec"></button><button class="lamp__settings__colors__button button-white" data-color="#fff"></button><button class="lamp__settings__colors__button button-yellow" data-color="#ffc600"></button></div></section><section class="lamp__settings__brightness"><h3 class=" settings-subtitle">Brightness</h3><div class="lamp__settings__brightness-controls"><button class="lamp__settings__brightness-less control-button"><svg class="controls-icon control-button-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><p class="lamp__settings__brightness-info">50%</p><button class="lamp__settings__brightness-more control-button"><svg class="controls-icon control-button-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></section></div></div>`;
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
      deviceSettingsMarkup = `<div class="condition"><div class="condition__value-container"><div class="condition__value"><h3 class="condition__value-temp">24°C</h3></div><div class="condition__controls"><button class="condition__controls-button-less control-button" data-temp="less"><svg class="condition__controls-button-icon control-button-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><button class="condition__controls-button-more control-button" data-temp="more"><svg class="condition__controls-button-icon control-button-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></div><ul class="condition-modes"><li class="condition-mode" data-mode="cool"><svg class="condition-mode-icon cool-icon"><use xlink:href="../images/sprite.svg#cool"></use></svg><h4 class="condition-mode-title">Cool</h4></li><li class="condition-mode" data-mode="hot"><svg class="condition-mode-icon hot-icon"><use xlink:href="../images/sprite.svg#hot"></use></svg><h4 class="condition-mode-title">Hot</h4></li><li class="condition-mode" data-mode="auto"><svg class="condition-mode-icon auto-icon"><use xlink:href="../images/sprite.svg#auto"></use></svg><h4 class="condition-mode-title">Auto</h4></li></ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const tempConditionerButtons = document.querySelectorAll(
        ".condition__controls button"
      );
      const tempValueEl = document.querySelector(".condition__value-temp");
      tempConditionerButtons.forEach((button) =>
        button.addEventListener("click", () =>
          changeValue(
            tempConditionerButtons[0],
            tempConditionerButtons[1],
            tempValueEl,
            5,
            35,
            "°C",
            event.currentTarget.dataset.temp
          )
        )
      );
      const conditionModes = document.querySelectorAll(".condition-mode");
      conditionModes.forEach((mode) =>
        mode.addEventListener("click", (event) =>
          changeMode(
            conditionModes,
            event.currentTarget.dataset.mode,
            "condition-mode--selected"
          )
        )
      );
      break;
    case "coffee-machine":
      deviceSettingsMarkup = `<div class="coffee"><img class="coffee-img" src="./../images/settings/coffee-machine.png"/><ul class="coffee-drinks"><li class="coffee-drink" data-coffee="cappuccino"><div class="coffee-drink-img-wrapper"><img class="coffee-drink-img" src="./../images/settings/cappuccino.png" alt="cappuccino" /></div><h3 class="coffee-drink-title">Cappuccino</h3><button class="coffee-drink-button">Start</button></li><li class="coffee-drink" data-coffee="cocoa"><div class="coffee-drink-img-wrapper"><img class="coffee-drink-img" src="./../images/settings/cocoa.png" alt="cocoa" /></div><h3 class="coffee-drink-title">Cocoa</h3><button class="coffee-drink-button">Start</button></li><li class="coffee-drink" data-coffee="latte"><div class="coffee-drink-img-wrapper"><img class="coffee-drink-img" src="./../images/settings/latte.png" alt="latte" /></div><h3 class="coffee-drink-title">Latte</h3><button class="coffee-drink-button">Start</button></li><li class="coffee-drink" data-coffee="espresso"><div class="coffee-drink-img-wrapper"><img class="coffee-drink-img" src="./../images/settings/espresso.png" alt="espresso" /></div><h3 class="coffee-drink-title">Espresso</h3><button class="coffee-drink-button">Start</button></li><li class="coffee-drink" data-coffee="coffee"><div class="coffee-drink-img-wrapper"><img class="coffee-drink-img" src="./../images/settings/coffee.png" alt="coffee" /></div><h3 class="coffee-drink-title">Black Coffee</h3><button class="coffee-drink-button">Start</button></li></ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".coffee-drink-button")
        .forEach((button) => button.addEventListener("click", makeCoffee));
      break;
    case "tv":
      let programmsItems = ``;
      for (let i = 0; i < functions.programms.length; i++) {
        programmsItems += `<li class="tv__programms__list-item modes-list" data-channel="${functions.programms[i]}">${functions.programms[i]}</li>`;
      }
      deviceSettingsMarkup = `<div class="tv"><div class="tv__programms"><h3 class="tv__programms-title settings-subtitle">Programms</h3><ul class="tv__programms__list">${programmsItems}</ul></div><div class="tv__settings"><div class="tv__settings__volume"><h3 class="tv__settings__volume-title settings-subtitle">Volume</h3><div class="tv__settings__volume-bar"><button class="tv__settings__volume-bar-button control-button" data-volume="less"><svg class="tv__settings__volume-bar-icon control-button-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="tv__settings__volume-bar-value">${functions.volume} %</p><button class="tv__settings__volume-bar-button control-button" data-volume="more"><svg class="tv__settings__volume-bar-icon control-button-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div><div class="tv__settings__controls"><h3 class="tv__settings__controls-title settings-subtitle">Controls</h3><div class="tv__settings__controls-container"><button class="tv__settings__controls-button control-button control-prev" data-programm="prev"><svg class="tv__settings__controls-icon control-button-icon"><use xlink:href="./../images/sprite.svg#arrow"></use></svg></button><button class="tv__settings__controls-button control-button control-next" data-programm="next"><svg class="tv__settings__controls-icon control-button-icon"><use xlink:href="./../images/sprite.svg#arrow"></use></svg></button></div></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".tv__programms__list-item")
        .forEach((programm) =>
          programm.addEventListener("click", setSelectedProrgamm)
        );
      setSelectedProrgamm();
      const volumeButtons = document.querySelectorAll(
        ".tv__settings__volume-bar-button"
      );
      const volumeEl = document.querySelector(
        ".tv__settings__volume-bar-value"
      );
      volumeButtons.forEach((button) =>
        button.addEventListener("click", (event) =>
          changeValue(
            volumeButtons[0],
            volumeButtons[1],
            volumeEl,
            1,
            99,
            "%",
            event.currentTarget.dataset.volume
          )
        )
      );
      document
        .querySelectorAll(".tv__settings__controls-button")
        .forEach((button) =>
          button.addEventListener("click", setSelectedProrgamm)
        );
      break;
    case "griller":
      let modesItems = ``;
      for (let i = 0; i < functions.modes.length; i++) {
        modesItems += `<li class="mode-item" data-mode="${functions.modes[
          i
        ].toLowerCase()}"><div class="mode-item__img-wrapper"><img class="mode-item__img" src="./../images/settings/${functions.modes[
          i
        ].toLowerCase()}.png"/></div><h3 class="mode-item-title">${
          functions.modes[i]
        }</h3></li>`;
      }
      deviceSettingsMarkup = `<div class="griller"><ul class="mode-list">${modesItems}</ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".mode-item")
        .forEach((mode) => mode.addEventListener("click", changeMode));
      break;
    case "oven":
      let ovenModesItems = ``;
      for (let i = 0; i < functions.modes.length; i++) {
        ovenModesItems += `<li class="oven-mode-item modes-list" data-mode="${functions.modes[
          i
        ].toLowerCase()}">${functions.modes[i]}</li>`;
      }
      deviceSettingsMarkup = `<div class="oven"><div class="oven-modes"><h3 class="oven__modes-title settings-subtitle">Modes</h3><ul class="oven__mode-list">${ovenModesItems}</ul></div><div class="oven__settings"><div class="oven__settings__temp"><h3 class="oven__settings__temp-title settings-subtitle">Temperature</h3><div class="oven__settings__temp_controls"><button class="oven__settings__temp-btn control-button" data-control="less"><svg class="oven__settings__temp-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="oven__settings__temp-value">${
        functions.temp
      } °C</p><button class="oven__settings__temp-btn control-button" data-control="more"><svg class="oven__settings__temp-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div><div class="oven__setings__light"><h3 class="oven__settings__light-title settings-subtitle">Light</h3><button class="oven__settings__light-button">${
        functions.light ? "Turn off" : "Turn on"
      }</button></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const ovenModes = document.querySelectorAll(".oven-mode-item");
      ovenModes.forEach((mode) =>
        mode.addEventListener("click", (event) =>
          changeMode(
            ovenModes,
            event.currentTarget.dataset.mode,
            "mode-item--selected"
          )
        )
      );
      const tempButtons = document.querySelectorAll(
        ".oven__settings__temp-btn"
      );
      const ovenTempEl = document.querySelector(".oven__settings__temp-value");
      tempButtons.forEach((button) =>
        button.addEventListener("click", (event) =>
          changeValue(
            tempButtons[0],
            tempButtons[1],
            ovenTempEl,
            1,
            319,
            "°C",
            event.currentTarget.dataset.control
          )
        )
      );
      document
        .querySelector(".oven__settings__light-button")
        .addEventListener("click", toggleOvenLight);
      break;
    case "loud":
      deviceSettingsMarkup = `<div class="loud"><img class="loud-img" src="./../images/settings/loud.png"/><div class="loud__volume"><h3 class="loud__volume-title settings-subtitle">Volume</h3><div class="loud__volume-container"><button class="loud__volume-button" data-volume="less"><svg class="loud__volume-button-icon"><use xlink:href="./../images/sprite.svg#volume-less"></use></svg></button><p class="loud__volume-value">${functions.volume} %</p><button class="loud__volume-button" data-volume="more"><svg class="loud__volume-button-icon"><use xlink:href="./../images/sprite.svg#volume-more"></use></svg></button></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const buttons = document.querySelectorAll(".loud__volume-button");
      const valueEl = document.querySelector(".loud__volume-value");
      buttons.forEach((button) =>
        button.addEventListener("click", (event) =>
          changeValue(
            buttons[0],
            buttons[1],
            valueEl,
            1,
            99,
            "%",
            event.currentTarget.dataset.volume
          )
        )
      );
      break;
    case "rice-cooker":
      let cookerModesItems = ``;
      functions.modes.forEach((mode) => {
        let imageUrl = `./../images/settings/${mode
          .toLowerCase()
          .split(" ")
          .join("-")}.png`;
        let item = `<li class="cooker__list-item" data-mode="${mode
          .toLowerCase()
          .split(" ")
          .join(
            "-"
          )}"><div class="cooker__list-item-img-wrapper"><img class="cooker__list-item-img" src="${imageUrl}" alt="${mode}" /></div><h3 class="cooker__list-item-title">${mode}</h3></li>`;
        cookerModesItems += item;
      });
      deviceSettingsMarkup = `<div class="cooker"><ul class="cooker__list">${cookerModesItems}</ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const cookerModes = document.querySelectorAll(".cooker__list-item");
      cookerModes.forEach((mode) =>
        mode.addEventListener("click", (event) =>
          changeMode(
            cookerModes,
            event.currentTarget.dataset.mode,
            "cooker__list-item--selected"
          )
        )
      );
      break;
    case "washing-machine":
      let washingModesItems = ``;
      functions.modes.forEach((mode) => {
        let kebabItemTitle = mode.toLowerCase().split(" ").join("-");
        let item = `<li class="washing__list-item ${kebabItemTitle}" data-mode="${kebabItemTitle}">${mode}<svg class="washing__list-item-icon"><use xlink:href="./../images/sprite.svg#${kebabItemTitle}"></use></svg></li>`;
        washingModesItems += item;
      });
      deviceSettingsMarkup = `<div class="washing"><div class="washing__pointer"><img class="washing__pointer-img" src="./../images/settings/pointer.png" /></div><ul class="washing__list">${washingModesItems}</ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".washing__list-item")
        .forEach((mode) => mode.addEventListener("click", changeWashingMode));
      break;
    case "smart-door":
      deviceSettingsMarkup = `<div class="door"><img class="door-img" src="./../images/settings/smart-door.png" /><div class="door__password-container"><input class="door__password-input" type="number" /><button class="door__password-button">${
        functions.isOpen ? "Close" : "Open"
      } the door</button></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelector(".door__password-input")
        .addEventListener("click", checkPasswordPresence);
      document
        .querySelector(".door__password-button")
        .addEventListener("click", changeDoorStatus);
      break;
    case "microwave-oven":
      deviceSettingsMarkup = `<div class="microwave"><div class="microwave__power"><h3 class="settings-subtitle">Power</h3><div class="microwave__buttons-wrapper"><button class="microwave__power-btn control-button" data-power="less"><svg class="microwave__power-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="microwave__power-value">${functions.power} W</p><button class="microwave__power-btn control-button" data-power="more"><svg class="microwave__power-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div><div class="microwave__time"><h3 class="settings-subtitle">Time</h3><div class="microwave__buttons-wrapper"><button class="microwave__time-btn control-button" data-time="less"><svg class="microwave__time-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="microwave__time-value">${functions.time} min</p><button class="microwave__time-btn control-button" data-time="more"><svg class="microwave__time-btn-icon control-button-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const powerButtons = document.querySelectorAll(".microwave__power-btn");
      const powerValueEl = document.querySelector(".microwave__power-value");
      powerButtons.forEach((button) =>
        button.addEventListener("click", (event) =>
          changeValue(
            powerButtons[0],
            powerButtons[1],
            powerValueEl,
            91,
            899,
            "W",
            event.currentTarget.dataset.power
          )
        )
      );
      const timeButtons = document.querySelectorAll(".microwave__time-btn");
      const timeValueEl = document.querySelector(".microwave__time-value");
      timeButtons.forEach((button) =>
        button.addEventListener("click", (event) =>
          changeValue(
            timeButtons[0],
            timeButtons[1],
            timeValueEl,
            1,
            59,
            "min",
            event.currentTarget.dataset.time
          )
        )
      );
      break;
    default:
      let powerItems = ``;
      functions.power.forEach(
        (item) =>
          (powerItems += `<li class="default-device__power">${item}</li>`)
      );
      deviceSettingsMarkup = `<div class="default-device"><img class="default-device__img" src="./../images/settings/${title}.png" alt="${title}" /><div class="default-device__wrapper"><h3 class="default-device-subtitle settings-subtitle">Power</h3><ul class="default-device__powers">${powerItems}</ul></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      const defaultModes = document.querySelectorAll(".default-device__power");
      break;
  }
}

setDeviceSettingsMarkup();
