import KanbanAPI from "./api/KanbanAPI.js";
import Modal from "./view/components/Modal.js";
import Item from "./view/Item.js";
import Kanban from "./view/Kanban.js"


//Kanban Main run
new Kanban(document.querySelector(".kanban"));


//Modals functions
const modalInputNewStory = document.querySelectorAll("#modal-input-new-story");
modalInputNewStory.forEach(element => {
    element.addEventListener("click", e => {
        new Modal(document.querySelector(".content"));  
    })
});

///