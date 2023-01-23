import KanbanAPI from "./api/KanbanAPI.js";
import Item from "./view/Item.js";
import Kanban from "./view/Kanban.js"

new Kanban(document.querySelector(".kanban"));

const addStory = document.querySelector("#add-story");
const inputStory = document.querySelector("#story-user");


addStory.addEventListener("click", () => {
    const input = inputStory.value;

    if(input !== ""){
        const newItem = KanbanAPI.insertItem(1, input);
        const column = document.querySelector(`[data-id="${1}"]`);
        const item = new Item(newItem.id, newItem.content);
        column.appendChild(item.elements.root);
    }
    inputStory.value = "";
});