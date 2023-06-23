import Item from "./Item.js";
import KanbanAPI from "../api/KanbanAPI.js"

export default class Column {
    constructor(id, title) {

        this.elements = {};

        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban-column-title");
        this.elements.items = this.elements.root.querySelector(".kanban-column-items");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.root.addEventListener("dragenter", (e) => {
            const columnId = Number(this.elements.root.dataset.id);

            const dragging = document.querySelector(".dragging");

            const applyAfter = this.getNewPosition(this.elements.items, e.clientY);

            const columnColor = KanbanAPI.getColor(columnId);

            const droppedItemElementStatus = dragging.querySelector(".kanban-item-status");

            droppedItemElementStatus.style.background = columnColor;

            if (applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                this.elements.items.prepend(dragging);
            }

           
        });

        this.elements.root.addEventListener("dragend", (e) => {
            e.preventDefault();
            const columnId = Number(this.elements.root.dataset.id);
            const dragging = e.target;
    
            const itemId = Number(dragging.getAttribute("data-id"));
            const dropZoneInColumn = Array.from(this.elements.items.querySelectorAll(".kanban-item"));
            const droppedIndex = dropZoneInColumn.indexOf(dragging);

            KanbanAPI.updateItem(
                itemId, {
                    columnId,
                    position: droppedIndex
                }
            );
        }); 


        
        const initialColor = KanbanAPI.getColor(id);

        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item, initialColor);
        })

    }

    static createRoot() {

        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban-column">
                <div class="kanban-column-title"></div>
                <div class="kanban-column-items"></div>
            </div>
        `).children[0];
    }

    renderItem(data, color) {
        const item = new Item(data.id, data.content, data.priority);
        item.elements.status.style.background = color;
        this.elements.items.appendChild(item.elements.root);
    }

    getNewPosition(column, posY){
        const cards = column.querySelectorAll(".kanban-item:not(.dragging)");
        let result;

        for(let refer_card of cards){
            const box = refer_card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;
    
            if(posY >= boxCenterY) result = refer_card;
        }
    
        return result;
    }
}