const menuIcon = document.querySelector(".hamburger-menu"); // laver variabelen hamburger-menu og linker den op mod klassen "hamburger-menu"
const navbar = document.querySelector(".navbar") // laver variablen navbar og linker den op mod klassen "navbar"

menuIcon.addEventListener("click", () => { // Ligger en eventlistener "click" på variablen menuIcon
    navbar.classList.toggle("change"); // ligger en toggle på navbar klassen som skal ligge og fjerne "change" klassen
});