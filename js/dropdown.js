const dropdown = document.querySelector(".dropdown");
// const profile = document.querySelector(".profile");
const caret = document.querySelector(".caret");
const menu = document.querySelector(".menu");
// const options = dropdown.querySelectorAll(".menu li");
// const selected = dropdown.querySelector(".selected");

dropdown.addEventListener("click", () => {
  caret.classList.toggle("caret-rotate");
  menu.classList.toggle("menu-open");
});
