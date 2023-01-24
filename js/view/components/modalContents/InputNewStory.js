import KanbanAPI from "../../../api/KanbanAPI.js";
import Item from "../../Item.js";

export default class InputNewStory{
    constructor(){
        this.elements = {};
        this.elements.root = InputNewStory.createRoot();
        this.elements.button = this.elements.root.querySelector("#add-story");
        this.elements.story = this.elements.root.querySelector("#story-user");

        this.elements.button.addEventListener("click", () => {
            const input = this.elements.story.value;
        
            if(input !== ""){
                const newItem = KanbanAPI.insertItem(1, input);
                const column = document.querySelector(`[data-id="${1}"]`);
                const item = new Item(newItem.id, newItem.content);
                column.appendChild(item.elements.root);
            }
            this.elements.story.value = "";
        });
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="input-group">
            <input id="story-user" type="text" placeholder="Enter your story user">
            <button type="button" class="btn-default" id="add-story">Add Story</button>
        </div>
    `).children[0];
    }

}