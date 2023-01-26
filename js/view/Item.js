import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item{

    constructor(id, content, priority){

        const bottomDropZone = DropZone.createDropZone();
        this.elements = {};

        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban-item-input");
        this.elements.deleteBTN = this.elements.root.querySelector(".kanban-item-delete-btn");
        this.elements.icon = this.elements.root.querySelector(".kanban-item-status-icon");
        this.elements.priority = this.elements.root.querySelector(".kanban-item-status-priority");
        
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.elements.priority.textContent = `Priority Level ${priority}`
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        this.elements.deleteBTN.addEventListener("click", e => {
            KanbanAPI.deleteItem(id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);

            let zonesShow = document.querySelectorAll(".kanban-dropzone");
            zonesShow.forEach(elements => {
                elements.classList.add("kanban-dropzone--show");
            })
        });

        this.elements.root.addEventListener("dragend", e => {
            let zonesShow = document.querySelectorAll(".kanban-dropzone");
            zonesShow.forEach(elements => {
                elements.classList.remove("kanban-dropzone--show");
            })        
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
                <div class="kanban-item-content">
                    <div class="kanban-item-head">
                        <div class="kanban-item-head-status">
                            <div class="kanban-item-status-icon"></div>
                            <div class="kanban-item-status-priority"></div>
                        </div>
                        <div class="kanban-item-head-buttons">
                            <button type="button" class="kanban-item-delete-btn" id="delete-story">&#10006;</button>
                        </div>
                    </div>
                    <div class="kanban-item-input"></div>
                </div>
            </div>
        `).children[0];
    }

}