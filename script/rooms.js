let rooms = [];

const makeRoomBtn = document.querySelector(".rooms__btn-add-room");
const title = document.querySelector(".rooms--title");
const addRoomModalWrapper = document.querySelector(
  ".rooms__add-room-modal-wrapper"
);
const addRoomInput = document.querySelector(".rooms__modal--input");
const addRoomBtnCancel = document.querySelector(
  ".rooms__modal__buttons-cancel"
);
const addRoomBtnAdd = document.querySelector(".rooms__modal__buttons-add");
const roomsList = document.querySelector(".rooms__list");

makeRoomBtn.addEventListener("click", openAddRoomModal);
addRoomBtnCancel.addEventListener("click", closeAddRoomModal);
addRoomBtnAdd.addEventListener("click", setRoom);

if (localStorage.rooms && localStorage.rooms.length > 0) {
  changeTitle();
  rooms = JSON.parse(localStorage.rooms);
  addRoom();
}

function openAddRoomModal() {
  addRoomModalWrapper.style.display = "block";
}

function closeAddRoomModal() {
  addRoomModalWrapper.style.display = "none";
}

class Room {
  constructor(title, image, devices) {
    this.title = title;
    this.image = image;
    this.devices = devices;
  }
}

function setRoom() {
  try {
    checkRoomName(addRoomInput.value);
    let image = setImage(addRoomInput.value);
    const room = new Room(addRoomInput.value, image, []);
    rooms.push(room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    closeAddRoomModal();
    addRoom();
  } catch (error) {
    alert(error.message);
  } finally {
    addRoomInput.value = "";
  }
}

function checkRoomName(value) {
  const titles = [];
  rooms.forEach((element) => titles.push(element.title));
  if (value.length === 0) {
    throw new Error("You didn't set the name for your room");
  } else if (titles.includes(value)) {
    throw new Error("You've already have room with this name");
  }
}

function changeTitle() {
  title.textContent = "Your rooms";
}

function setImage(value) {
  switch (value.toLowerCase()) {
    case "kitchen":
      return "../images/rooms/kitchen.jpg";
      break;
    case "bathroom":
      return "../images/rooms/bathroom.jpg";
      break;
    case "living room":
      return "../images/rooms/living-room.jpg";
      break;
    case "bedroom":
      return "../images/rooms/bedroom.jpg";
      break;
    case "children's room":
      return "../images/rooms/children-room.jpg";
      break;
    case "office":
      return "../images/rooms/office.jpg";
      break;
    default:
      return "../images/rooms/other-room.jpg";
      break;
  }
}

function addRoom() {
  let roomsListItems = ``;
  for (let i = 0; i < rooms.length; i++) {
    let devicesCount = rooms[i].devices.length;
    let item = `<li class="rooms__list-item"><div class="rooms__list-item__header"><h2 class="rooms__list-item__header-title">${
      rooms[i].title
    }</h2><p class="rooms__list-item__header-text">${devicesCount} ${
      devicesCount === 1 ? "device" : "devices"
    }</p></div><img class="rooms__list-item--image" src="${
      rooms[i].image
    }" alt="${rooms[i].title}" /><a href="../pages/devices.html" data-room="${
      rooms[i].title
    }" class="rooms__list-item__button"><div class="rooms__list-item__button--icon-wrapper"><svg class="rooms__list-item__button--icon">
    <use xlink:href="../images/sprite.svg#plus"></use>
  </svg></div>Add device</a></li>`;
    roomsListItems += item;
  }
  roomsList.innerHTML = roomsListItems;
  document
    .querySelectorAll(".rooms__list-item__button")
    .forEach((el) => el.addEventListener("click", setRoomName));
}

function setRoomName() {
  localStorage.setItem("selectedRoom", this.dataset.room);
}
