// const rooms = [];

// const makeRoomBtn = document.querySelector(".main__btn-add-room");
// const title = document.querySelector(".main--title");
// const modalWrapper = document.querySelector(".add-room-modal-wrapper");
// const modal = document.querySelector(".modal");
// const input = document.querySelector(".modal--input");
// const btnCancel = document.querySelector(".modal__buttons-cancel");
// const btnAdd = document.querySelector(".modal__buttons-add");
// const roomsList = document.querySelector(".main__rooms");

// makeRoomBtn.addEventListener("click", openModal);
// btnCancel.addEventListener("click", closeModal);
// btnAdd.addEventListener("click", setRoom);

// function openModal() {
//   modalWrapper.style.display = "block";
// }

// function closeModal() {
//   modalWrapper.style.display = "none";
// }

// class Room {
//   constructor(name, image) {
//     this.name = name;
//     this.image = image;
//   }
// }

// function setRoom() {
//   changeTitle();
//   let image = setImage(input.value);
//   console.log(image);
//   const room = new Room(input.value, image);
//   rooms.push(room);
//   input.value = "";
//   closeModal();
//   addRoom();
// }

// function changeTitle() {
//   title.textContent = "Your rooms";
// }

// function setImage(value) {
//   switch (value.toLowerCase()) {
//     case "kitchen":
//       return "images/kitchen.jpg";
//       break;
//     case "bathroom":
//       return "images/bathroom.jpg";
//       break;
//     case "living room":
//       return "images/living-room.jpg";
//       break;
//     case "bedroom":
//       return "images/bedroom.jpg";
//       break;
//     case "children's room":
//       return "images/children-room.jpg";
//       break;
//     case "office":
//       return "images/office.jpg";
//       break;
//     default:
//       return "images/other-room.jpg";
//       break;
//   }
// }

// function addRoom() {
//   const roomsListItems = [];
//   for (let i = 0; i < rooms.length; i++) {
//     let item = `<li class="rooms--item"><h2 class="room--item--title">${rooms[i].name}</h2><img class="room--item--image" src="${rooms[i].image}" /></li>`;
//     roomsListItems.push(item);
//   }
//   roomsList.innerHTML = roomsListItems;
// }
