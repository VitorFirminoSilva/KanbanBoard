import Modal from "./view/components/Modal.js";
import Kanban from "./view/Kanban.js"
import ButtonTriggerModal from "./view/components/Buttons/ButtonTriggerModal.js"

//Kanban Main run
new Kanban(document.querySelector(".kanban"));
new ButtonTriggerModal();



//Sidebar functions
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

///