const menuItems = document.querySelectorAll(".footer__nav--item");

export function changeMenuItem() {
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].dataset.menu === localStorage.menuItem) {
      menuItems[i].classList.add("footer__nav--item--active");
    } else {
      menuItems[i].classList.remove("footer__nav--item--active");
    }
  }
}
