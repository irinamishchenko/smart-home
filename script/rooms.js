let rooms = [];

const makeRoomBtn = document.querySelector(".main__btn-add-room");
const title = document.querySelector(".main--title");
const addRoomModalWrapper = document.querySelector(".add-room-modal-wrapper");
const addRoomInput = document.querySelector(".modal--input");
const addRoomBtnCancel = document.querySelector(".modal__buttons-cancel");
const addRoomBtnAdd = document.querySelector(".modal__buttons-add");
const roomsList = document.querySelector(".main__rooms");

makeRoomBtn.addEventListener("click", openAddRoomModal);
addRoomBtnCancel.addEventListener("click", closeAddRoomModal);
addRoomBtnAdd.addEventListener("click", setRoom);

if (JSON.parse(localStorage.rooms).length > 0) {
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
      return "../images/kitchen.jpg";
      break;
    case "bathroom":
      return "../images/bathroom.jpg";
      break;
    case "living room":
      return "../images/living-room.jpg";
      break;
    case "bedroom":
      return "../images/bedroom.jpg";
      break;
    case "children's room":
      return "../images/children-room.jpg";
      break;
    case "office":
      return "../images/office.jpg";
      break;
    default:
      return "../images/other-room.jpg";
      break;
  }
}

function addRoom() {
  const roomsListItems = [];
  for (let i = 0; i < rooms.length; i++) {
    let devicesCount = rooms[i].devices.length;
    let item = `<li class="rooms-item"><div class="rooms-item__header"><h2 class="rooms-item__header-title">${
      rooms[i].title
    }</h2><p class="rooms-item__header-text">${devicesCount} ${
      devicesCount === 1 ? "device" : "devices"
    }</p></div><img class="rooms-item--image" src="${rooms[i].image}" alt="${
      rooms[i].title
    }" /><a href="../pages/devices.html" data-room="${
      rooms[i].title
    }" class="rooms-item__button"><div class="rooms-item__button--icon-wrapper"><svg class="rooms-item__button--icon">
    <use xlink:href="../images/sprite.svg#plus"></use>
  </svg></div>Add device</a></li>`;
    roomsListItems.push(item);
  }
  roomsList.innerHTML = roomsListItems;
  document
    .querySelectorAll(".rooms-item__button")
    .forEach((el) => el.addEventListener("click", test));
}

function test() {
  console.log(this.dataset.room);
}
