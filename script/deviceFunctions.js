import { switchDevicePower, turnOnDevicePower } from "./settings.js";

const rooms = JSON.parse(localStorage.rooms);
const devices = rooms.find(
  (room) => room.title === localStorage.selectedRoom
).devices;

function changeValue(
  lessButton,
  moreButton,
  valueEl,
  minValue,
  maxValue,
  unit,
  data
) {
  console.log(data);
  turnOnDevicePower();
  let value = parseInt(valueEl.textContent);
  if (value === maxValue) {
    moreButton.disabled = true;
  } else if (value === minValue) {
    lessButton.disabled = true;
  } else {
    moreButton.disabled = false;
    lessButton.disabled = false;
  }
  if (data === "less") {
    value -= 1;
  } else {
    value += 1;
  }
  valueEl.textContent = `${value} ${unit}`;
}

function changeMode(modes, selectedMode, selectedClass) {
  turnOnDevicePower();
  for (let i = 0; i < modes.length; i++) {
    if (modes[i].dataset.mode === selectedMode) {
      modes[i].classList.add(selectedClass);
    } else {
      modes[i].classList.remove(selectedClass);
    }
  }
}

function setSelectedLampColor(event) {
  turnOnDevicePower();
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
  turnOnDevicePower();
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
    event.currentTarget.classList.value.includes(
      "lamp__settings__brightness-less"
    )
  ) {
    brightnessValue -= 1;
  } else {
    brightnessValue += 1;
  }
  brightnessInfo.textContent = brightnessValue + "%";
  lightIcon.style.opacity = `0.${brightnessValue}`;
}

function makeCoffee(event) {
  turnOnDevicePower();
  event.target.textContent = "In progress";
  setTimeout(() => {
    alert("Your drink is done!");
    event.target.textContent = "Start";
    switchDevicePower();
  }, 120000);
}

function setSelectedProrgamm(event) {
  turnOnDevicePower();
  const channels = document.querySelectorAll(".tv__programms__list-item");
  const programms = devices.find(
    (device) => device.title === localStorage.selectedDevice
  ).functions.programms;
  let selectedProgramm;
  if (!event) {
    selectedProgramm = programms[0];
  } else if (event.target.dataset.channel) {
    selectedProgramm = event.target.dataset.channel;
  } else {
    let index;
    for (let i = 0; i < channels.length; i++) {
      if (
        channels[i].classList.contains("tv__programms__list-item--selected")
      ) {
        index = i;
      }
    }
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

function changeWashingMode(event) {
  turnOnDevicePower();
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

function changeDoorStatus(event) {
  turnOnDevicePower();
  const input = document.querySelector(".door__password-input");
  let functions = rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.find(
      (device) => device.title === localStorage.selectedDevice
    ).functions;
  let { password, isOpen } = functions;
  if (input.value !== password) {
    alert("Incorrect password!");
    input.value = "";
  } else {
    console.log();
    if (isOpen) {
      rooms
        .find((room) => room.title === localStorage.selectedRoom)
        .devices.find(
          (device) => device.title === localStorage.selectedDevice
        ).functions.isOpen = false;
      event.target.textContent = "Open the door";
    } else {
      rooms
        .find((room) => room.title === localStorage.selectedRoom)
        .devices.find(
          (device) => device.title === localStorage.selectedDevice
        ).functions.isOpen = true;
      event.target.textContent = "Close the door";
    }
    input.value = "";
  }
}

export {
  changeValue,
  changeMode,
  setSelectedLampColor,
  changeLampBrightness,
  makeCoffee,
  setSelectedProrgamm,
  toggleOvenLight,
  changeWashingMode,
  changeDoorStatus,
};
