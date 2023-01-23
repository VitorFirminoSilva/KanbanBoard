import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item{

    constructor(id, content){

        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};

        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban-item-input");
        this.elements.deleteBTN = this.elements.root.querySelector(".kanban-item-delete-btn");
       
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        this.elements.deleteBTN.addEventListener("click", e => {
            KanbanAPI.deleteItem(id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban-item" draggable="true">
                <button type="button" class="kanban-item-delete-btn" id="delete-story">&#10006;</button>
                <div class="kanban-item-input"></div>
            </div>
        `).children[0];
    }

}