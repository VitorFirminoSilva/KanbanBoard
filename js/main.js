import Modal from "./view/components/Modal.js";
import Kanban from "./view/Kanban.js"

//Kanban Main run
new Kanban(document.querySelector(".kanban"));


//Modals functions
const modalInputNewStory = document.querySelectorAll("#modal-input-new-story");
modalInputNewStory.forEach(element => {
    element.addEventListener("click", e => {
        new Modal(document.querySelector(".content"), "newStory");  
    })
});

///

//Sidebar functions
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

///