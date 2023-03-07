import Modal from "./view/components/Modal.js";
import Kanban from "./view/Kanban.js"
import ButtonTriggerModal from "./view/components/Buttons/ButtonTriggerModal.js"

//Kanban Main run
new Kanban(document.querySelector(".kanban"));
new ButtonTriggerModal(document.querySelector("body"));



//Sidebar functions
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const kanban = body.querySelector(".kanban");
const toggle = body.querySelector(".toggle.angle");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    kanban.classList.toggle("close");
});

const toggleBar = body.querySelector(".toggle.bar");
const menuBar = body.querySelector(".sidebar .menu-bar");
const logo = body.querySelector(".sidebar header .image-text");

toggleBar.addEventListener("click", () => {

    toggleBar.classList.toggle("fa-bars");
    toggleBar.classList.toggle("fa-close");
    
    sidebar.classList.toggle("open");
    menuBar.classList.toggle("open");
    logo.classList.toggle("open");

});

///