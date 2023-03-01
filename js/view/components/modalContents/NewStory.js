import KanbanAPI from "../../../api/KanbanAPI.js";
import Item from "../../Item.js";
import Slider from "../Slider.js";
import ButtonTriggerModal from "../Buttons/ButtonTriggerModal.js"

export default class InputNewStory{
    constructor(){
        this.elements = {};
        this.elements.root = InputNewStory.createRoot();
        this.elements.button = this.elements.root.querySelector("#add-story");
        this.elements.story = this.elements.root.querySelector("#story-user");
        const slider = new Slider();
        new ButtonTriggerModal(this.elements.root);

        let sliderValue = 0;

        slider.elements.inputArray.forEach(element => {
            element.addEventListener("click", e => {
               sliderValue = element.value;
            });
        })

        this.elements.story.after(slider.elements.root);


        this.elements.button.addEventListener("click", () => {
            const input = this.elements.story.value;
        
            if(input !== ""){
                
                const newItem = KanbanAPI.insertItem(1, input, sliderValue);

                const initialColor = KanbanAPI.getColor(1);
                const column = document.querySelector(`[data-id="${1}"]`);
                const item = new Item(newItem.id, newItem.content, sliderValue);

                item.elements.icon.style.background = initialColor;

                const columnList = column.querySelector(".kanban-column-items")

                columnList.appendChild(item.elements.root);
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
            <button type="button" class="button btn-default" data-trigger="remove-modal" id="add-story">Add Story</button>
        </div>
    `).children[0];
    }

}