import Item from "./Item.js";
import KanbanAPI from "../api/KanbanAPI.js"
import DropZone from "./DropZone.js";

export default class Column{
    constructor(id, title){

        const topDropZone = DropZone.createDropZone();

        this.elements = {};

        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban-column-title");
        this.elements.items = this.elements.root.querySelector(".kanban-column-items");
        
        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.root.appendChild(topDropZone);


        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item);
        })
    
    }

    static createRoot(){

        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban-column">
                <div class="kanban-column-title"></div>
                <div class="kanban-column-items"></div>
            </div>
        `).children[0];
    }

    renderItem(data){
        const item = new Item(data.id, data.content);
        this.elements.items.appendChild(item.elements.root);
    }
}