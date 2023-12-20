const devicesList = document.querySelector(".settings__header__devices-list");
const title = document.querySelector(".settings__header--title");
const batteryIndex = document.querySelector(".settings__header--battery");
const switcher = document.querySelector(".switcher");
const switcherBackground = document.querySelector(".switcher-background");
const switcherButton = document.querySelector(".switcher-button");
const main = document.querySelector(".settings__main");

// let lampColorsControls;

switcher.addEventListener("click", switchDevicePower);
// let selectedProgramm;

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
  functions = {};
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
  setFunctions(functions) {
    this.functions = functions;
  }
}

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

if (devices.length > 1) {
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
      functions = { password: "1234" };
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
    case "water-boiler":
      functions = { temp: 50 };
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
      deviceSettingsMarkup = `<div class="lamp"><div class="lamp__img-container"><img class="lamp-img" src="../images/settings/lamp.png" /><svg class="lamp-icon"><use xlink:href="../images/sprite.svg#lamp-light"></use></svg></div><div class="lamp__settings"><section class="lamp__settings__colors"><h3 class="lamp__settings__colors-title">Colors</h3><div class="lamp__settings__colors__buttons"><button class="lamp__settings__colors__button button-blue" data-color="#254bec"></button><button class="lamp__settings__colors__button button-white" data-color="#fff"></button><button class="lamp__settings__colors__button button-yellow" data-color="#ffc600"></button></div></section><section class="lamp__settings__brightness"><h3 class="lamp__settings__brightness-title">Brightness</h3><div class="lamp__settings__brightness-controls"><button class="lamp__settings__brightness-less"><svg class="controls-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><p class="lamp__settings__brightness-info">50%</p><button class="lamp__settings__brightness-more"><svg class="controls-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></section></div></div>`;
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
      deviceSettingsMarkup = `<div class="condition"><div class="condition__value-container"><div class="condition__value"><h3 class="condition__value-temp">24°C</h3></div><div class="condition__controls"><button class="condition__controls-button-less"><svg class="condition__controls-button-icon"><use xlink:href="../images/sprite.svg#minus"></use></svg></button><button class="condition__controls-button-more"><svg class="condition__controls-button-icon"><use xlink:href="../images/sprite.svg#plus"></use></svg></button></div></div><ul class="condition-modes"><li class="condition-mode" data-mode="cool"><svg class="condition-mode-icon cool-icon"><use xlink:href="../images/sprite.svg#cool"></use></svg><h4 class="condition-mode-title">Cool</h4></li><li class="condition-mode" data-mode="hot"><svg class="condition-mode-icon hot-icon"><use xlink:href="../images/sprite.svg#hot"></use></svg><h4 class="condition-mode-title">Hot</h4></li><li class="condition-mode" data-mode="auto"><svg class="condition-mode-icon auto-icon"><use xlink:href="../images/sprite.svg#auto"></use></svg><h4 class="condition-mode-title">Auto</h4></li></ul></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".condition__controls button")
        .forEach((button) =>
          button.addEventListener("click", changeConditionTemp)
        );
      document
        .querySelectorAll(".condition-mode")
        .forEach((mode) => mode.addEventListener("click", setConditionMode));
      setConditionMode();
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
        programmsItems += `<li class="tv__programms__list-item" data-channel="${functions.programms[i]}">${functions.programms[i]}</li>`;
      }
      deviceSettingsMarkup = `<div class="tv"><div class="tv__programms"><h3 class="tv__programms-title">Programms</h3><ul class="tv__programms__list">${programmsItems}</ul></div><div class="tv__settings"><div class="tv__settings__volume"><h3 class="tv__settings__volume-title">Volume</h3><div class="tv__settings__volume-bar"><button class="tv__settings__volume-bar-button" data-volume="less"><svg class="tv__settings__volume-bar-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="tv__settings__volume-bar-value">${functions.volume} %</p><button class="tv__settings__volume-bar-button" data-volume="more"><svg class="tv__settings__volume-bar-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div><div class="tv__settings__controls"><h3 class="tv__settings__controls-title">Controls</h3><div class="tv__settings__controls-container"><button class="tv__settings__controls-button control-prev" data-programm="prev"><svg class="tv__settings__controls-icon"><use xlink:href="./../images/sprite.svg#arrow"></use></svg></button><button class="tv__settings__controls-button control-next" data-programm="next"><svg class="tv__settings__controls-icon"><use xlink:href="./../images/sprite.svg#arrow"></use></svg></button></div></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".tv__programms__list-item")
        .forEach((programm) =>
          programm.addEventListener("click", setSelectedProrgamm)
        );
      document
        .querySelectorAll(".tv__settings__volume-bar-button")
        .forEach((button) => button.addEventListener("click", changeTvVolume));
      setSelectedProrgamm();
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
        ovenModesItems += `<li class="oven-mode-item" data-mode="${functions.modes[
          i
        ].toLowerCase()}">${functions.modes[i]}</li>`;
      }
      deviceSettingsMarkup = `<div class="oven"><div class="oven-modes"><h3 class="oven__modes-title">Modes</h3><ul class="oven__mode-list">${ovenModesItems}</ul></div><div class="oven__settings"><div class="oven__settings__temp"><h3 class="oven__settings__temp-title">Temperature</h3><div class="oven__settings__temp_controls"><button class="oven__settings__temp-btn" data-control="less"><svg class="oven__settings__temp-btn-icon"><use xlink:href="./../images/sprite.svg#minus"></use></svg></button><p class="oven__settings__temp-value">${
        functions.temp
      }°C</p><button class="oven__settings__temp-btn" data-control="more"><svg class="oven__settings__temp-btn-icon"><use xlink:href="./../images/sprite.svg#plus"></use></svg></button></div></div><div class="oven__setings__light"><h3 class="oven__settings__light-title">Light</h3><button class="oven__settings__light-button">${
        functions.light ? "Turn off" : "Turn on"
      }</button></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".oven-mode-item")
        .forEach((mode) => mode.addEventListener("click", changeOvenMode));
      document
        .querySelectorAll(".oven__settings__temp-btn")
        .forEach((button) => button.addEventListener("click", changeOvenTemp));
      document
        .querySelector(".oven__settings__light-button")
        .addEventListener("click", toggleOvenLight);
      break;
    case "loud":
      deviceSettingsMarkup = `<div class="loud"><img class="loud-img" src="./../images/settings/loud.png"/><div class="loud__volume"><h3 class="loud__volume-title">Volume</h3><div class="loud__volume-container"><button class="loud__volume-button" data-volume="less"><svg class="loud__volume-button-icon"><use xlink:href="./../images/sprite.svg#volume-less"></use></svg></button><p class="loud__volume-value">${functions.volume}</p><button class="loud__volume-button" data-volume="more"><svg class="loud__volume-button-icon"><use xlink:href="./../images/sprite.svg#volume-more"></use></svg></button></div></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".loud__volume-button")
        .forEach((button) =>
          button.addEventListener("click", changeLoudVolume)
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
      document
        .querySelectorAll(".cooker__list-item")
        .forEach((item) => item.addEventListener("click", changeCookerMode));
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
    case "microwave-oven":
      deviceSettingsMarkup = `<div class=""></div>`;
      container.innerHTML = deviceSettingsMarkup;
      break;
    case "smart-door":
      deviceSettingsMarkup = `<div class="door"></div>`;
      container.innerHTML = deviceSettingsMarkup;
      break;

    default:
      let powerItems = ``;
      functions.power.forEach(
        (item) =>
          (powerItems += `<li class="default-device__power">${item}</li>`)
      );
      deviceSettingsMarkup = `<div class="default-device"><img class="default-device__img" src="./../images/settings/${title}.png" alt="${title}" /><div class="default-device__wrapper"><h3 class="default-device-subtitle">Power</h3><ul class="default-device__powers">${powerItems}</ul></div></div>`;
      container.innerHTML = deviceSettingsMarkup;
      document
        .querySelectorAll(".default-device__power")
        .forEach((item) => item.addEventListener("click", setPowerDefault));
      setPowerDefault();
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

function changeConditionTemp(event) {
  const tempInfo = document.querySelector(".condition__value-temp");
  let tempValue = parseInt(tempInfo.textContent);
  if (
    event.currentTarget.classList.value === "condition__controls-button-less"
  ) {
    tempValue -= 1;
  } else {
    tempValue += 1;
  }
  tempInfo.textContent = tempValue + "°C";
}

function setConditionMode(event) {
  let selectedMode;
  const modes = document.querySelectorAll(".condition-mode");
  if (!event) {
    selectedMode = "auto";
  } else {
    selectedMode = event.currentTarget.dataset.mode;
  }
  for (let i = 0; i < modes.length; i++) {
    if (modes[i].dataset.mode === selectedMode) {
      modes[i].classList.add("condition-mode--selected");
    } else {
      modes[i].classList.remove("condition-mode--selected");
    }
  }
}

function makeCoffee(event) {
  switchDevicePower();
  event.target.textContent = "In progress";
  setTimeout(() => {
    alert("Your drink is done!");
    event.target.textContent = "Start";
    switchDevicePower();
  }, 120000);
}

function setPowerDefault(event) {
  let selectedPower;
  const items = document.querySelectorAll(".default-device__power");
  if (!event) {
    selectedPower = 1;
  } else {
    selectedPower = +event.target.textContent;
  }
  for (let i = 0; i < items.length; i++) {
    if (+items[i].textContent === selectedPower) {
      items[i].classList.add("default-device__power--selected");
    } else {
      items[i].classList.remove("default-device__power--selected");
    }
  }
}

function setSelectedProrgamm(event) {
  const channels = document.querySelectorAll(".tv__programms__list-item");
  const programms = devices.find(
    (device) => device.title === localStorage.selectedDevice
  ).functions.programms;
  if (!event) {
    selectedProgramm = programms[0];
  } else if (event.target.dataset.channel) {
    selectedProgramm = event.target.dataset.channel;
  } else {
    let index = programms.indexOf(selectedProgramm);
    if (event.currentTarget.dataset.programm === "next") {
      if (index >= programms.length - 1) {
        index = -1;
      }
      selectedProgramm = programms[index + 1];
    } else {
      if (index < 1) {
        index = programms.length;
      }
      selectedProgramm = programms[index - 1];
    }
  }
  for (let i = 0; i < channels.length; i++) {
    if (channels[i].dataset.channel === selectedProgramm) {
      channels[i].classList.add("tv__programms__list-item--selected");
    } else {
      channels[i].classList.remove("tv__programms__list-item--selected");
    }
  }
}

function changeTvVolume(event) {
  let volumeEl = document.querySelector(".tv__settings__volume-bar-value");
  let volumeValue = parseInt(volumeEl.textContent);
  const lessButton = document.querySelector(
    ".tv__settings__volume-bar-button[data-volume='less'"
  );
  const moreButton = document.querySelector(
    ".tv__settings__volume-bar-button[data-volume='more'"
  );
  if (volumeValue === 99) {
    moreButton.disabled = true;
  } else if (volumeValue === 1) {
    lessButton.disabled = true;
  } else {
    moreButton.disabled = false;
    lessButton.disabled = false;
  }
  if (event.currentTarget.dataset.volume === "more") {
    volumeValue += 1;
  } else {
    volumeValue -= 1;
  }
  volumeEl.textContent = volumeValue + "%";
}

function changeOvenMode(event) {
  let selectedMode;
  const modeElements = document.querySelectorAll(".mode-item");
  selectedMode = event.currentTarget.dataset.mode;
  for (let i = 0; i < modeElements.length; i++) {
    if (modeElements[i].dataset.mode === selectedMode) {
      modeElements[i].classList.add("mode-item--selected");
    } else {
      modeElements[i].classList.remove("mode-item--selected");
    }
  }
}

function changeOvenTemp(event) {
  const ovenTempEl = document.querySelector(".oven__settings__temp-value");
  const lessButton = document.querySelector(
    ".oven__settings__temp-btn[data-control='less'"
  );
  const moreButton = document.querySelector(
    ".oven__settings__temp-btn[data-control='more'"
  );
  let ovenTempValue = parseInt(ovenTempEl.textContent);
  if (ovenTempValue === 1) {
    lessButton.disabled = true;
  } else if (ovenTempValue === 319) {
    moreButton.disabled = true;
  } else {
    lessButton.disabled = false;
    moreButton.disabled = false;
  }
  if (event.currentTarget.dataset.control === "less") {
    ovenTempValue -= 1;
  } else {
    ovenTempValue += 1;
  }
  ovenTempEl.textContent = ovenTempValue + "°C";
}

function toggleOvenLight(event) {
  rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find(
      (device) => device.title === localStorage.selectedDevice
    ).functions.light = !rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find((device) => device.title === localStorage.selectedDevice)
    .functions.light;
  if (
    rooms
      .find((room) => room.title === localStorage.selectedRoom)
      .devices.find((device) => device.title === localStorage.selectedDevice)
      .functions.light
  ) {
    event.currentTarget.classList.add("oven__settings__light-button--active");
  } else {
    event.currentTarget.classList.remove(
      "oven__settings__light-button--active"
    );
  }
  localStorage.setItem("rooms", JSON.stringify(rooms));
}

function changeLoudVolume(event) {
  const lessButton = document.querySelector(
    ".loud__volume-button[data-volume='less'"
  );
  const moreButton = document.querySelector(
    ".loud__volume-button[data-volume='more'"
  );
  const volumeValueEl = document.querySelector(".loud__volume-value");
  let volumeValue = +volumeValueEl.textContent;
  if (volumeValue === 99) {
    moreButton.disabled = true;
  } else if (volumeValue === 1) {
    lessButton.disabled = true;
  } else {
    moreButton.disabled = false;
    lessButton.disabled = false;
  }
  if (event.currentTarget.dataset.volume === "less") {
    volumeValue -= 1;
  } else {
    volumeValue += 1;
  }
  volumeValueEl.textContent = volumeValue;
}

function changeCookerMode(event) {
  let selectedMode;
  const modes = document.querySelectorAll(".cooker__list-item");
  selectedMode = event.currentTarget.dataset.mode;
  for (let i = 0; i < modes.length; i++) {
    if (modes[i].dataset.mode === selectedMode) {
      modes[i].classList.add("cooker__list-item--selected");
    } else {
      modes[i].classList.remove("cooker__list-item--selected");
    }
  }
}

function changeWashingMode(event) {
  let selectedMode;
  const modes = document.querySelectorAll(".washing__list-item ");
  const pointer = document.querySelector(".washing__pointer");
  selectedMode = event.currentTarget.dataset.mode;
  switch (selectedMode) {
    case "quick-wash":
      pointer.style.transform = "rotate(30deg)";
      break;
    case "sport":
      pointer.style.transform = "rotate(130deg)";
      break;
    case "cotton":
      pointer.style.transform = "rotate(180deg)";
      break;
    case "soft-wash":
      pointer.style.transform = "rotate(220deg)";
      break;
    case "shoes":
      pointer.style.transform = "rotate(330deg)";
      break;

    default:
      pointer.style.transform = "rotate(0deg)";
      break;
  }
  for (let i = 0; i < modes.length; i++) {
    if (modes[i].dataset.mode === selectedMode) {
      modes[i].classList.add("washing__list-item--selected");
    } else {
      modes[i].classList.remove("washing__list-item--selected");
    }
  }
}
