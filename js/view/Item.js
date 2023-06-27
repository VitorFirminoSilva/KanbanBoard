import KanbanAPI from "../api/KanbanAPI.js";

export default class Item{

    constructor(id, content, priority){

        this.elements = {};

        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban-item-input");
        this.elements.deleteBTN = this.elements.root.querySelector(".kanban-item-button-delete");
        this.elements.status = this.elements.root.querySelector(".kanban-item-status");
        this.elements.priority = this.elements.root.querySelector(".kanban-item-priority-triangle");
        
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.elements.priority.setAttribute("data-priority-level", priority)
        this.content = content;

        this.elements.deleteBTN.addEventListener("click", e => {
            KanbanAPI.deleteItem(id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        });


        document.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
            e.target.classList.add("dragging");
        });

        this.elements.root.addEventListener("dragend", e => {
            e.target.classList.remove("dragging");
        });

        
        this.elements.root.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban-item" draggable="true">
                <div class="kanban-item-container">
                    <div class="kanban-item-status"></div>
                    <div class="kanban-item-content">
                        <div class="kanban-item-input"></div>
                        <div class="kanban-item-icons">
                            <div class="kanban-item-buttons">
                                <button type="button" class="kanban-item-button-edit"><i class="fa fa-edit icon"></i></button>
                                <button type="button" class="kanban-item-button-delete"><i class="fa fa-close icon"></i></button>
                            </div>                  
                            <div class="kanban-item-priority">
                                <div class="kanban-item-priority-triangle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="kanban-item-footer"></div>
                </div>
            </div>
        `).children[0];

    }
}