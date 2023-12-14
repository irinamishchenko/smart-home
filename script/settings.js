const title = document.querySelector(".settings__title");

title.textContent = localStorage.selectedDevice
  .split("-")
  .map((word) => word[0].toUpperCase() + word.substring(1))
  .join(" ");
