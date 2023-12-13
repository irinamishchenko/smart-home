let rooms = [];

const roomsList = document.querySelector(".devices__header__list");
const addDeviceBtn = document.querySelector(".devices__add-button");
const addDeviceModalWrapper = document.querySelector(".devices__modal-wrapper");
const cancelDeviceBtn = document.querySelector(".devices__modal__btn-cancel");
const chooseDeviceButtons = document.querySelectorAll(
  ".devices__list-item__button"
);

addDeviceBtn.addEventListener("click", openAddDeviceModal);
cancelDeviceBtn.addEventListener("click", closeAddDeviceModal);

if (JSON.parse(localStorage.rooms).length > 0) {
  // changeTitle();
  rooms = JSON.parse(localStorage.rooms);
  addRooms();
}

function addRooms() {
  let roomsListItems = ``;
  const selectedRoom = localStorage.selectedRoom;
  for (let i = 0; i < rooms.length; i++) {
    // if(rooms[i].title === localStorage.)
    let item;
    if (rooms[i].title === selectedRoom) {
      console.log(rooms[i]);
      item = `<li class="devices__header__list-item devices__header__list-item--selected" data-room="${rooms[i].title}">${rooms[i].title}</li>`;
    } else {
      item = `<li class="devices__header__list-item" data-room="${rooms[i].title}">${rooms[i].title}</li>`;
    }

    roomsListItems += item;
  }
  roomsList.innerHTML = roomsListItems;
  // document
  //   .querySelectorAll(".rooms__list-item__button")
  //   .forEach((el) => el.addEventListener("click", setRoomName));
  //   setSelectedRoom();
}

// function setSelectedRoom() {
//     const selectedRoom = localStorage.selectedRoom;

// }

function openAddDeviceModal() {
  addDeviceModalWrapper.style.display = "block";
  chooseDeviceButtons.forEach((button) =>
    button.addEventListener("click", addDevice)
  );
}

function closeAddDeviceModal() {
  addDeviceModalWrapper.style.display = "none";
}

class Device {
  constructor(title) {
    this.title = title;
  }
}

function addDevice(event) {
  let chosenDevise = event.target.parentNode.children[1].innerText
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  const device = new Device(chosenDevise);
  rooms
    .find((room) => room.title === localStorage.selectedRoom)
    .devices.push(device);
  localStorage.setItem("rooms", JSON.stringify(rooms));
  closeAddDeviceModal();
}
