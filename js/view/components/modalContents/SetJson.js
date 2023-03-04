import KanbanAPI from "../../../api/KanbanAPI.js";
import Modal from "../Modal.js";
import Kanban from "../../Kanban.js";

export default class SetJson{
    constructor(){
        this.elements = {};
        this.elements.root = SetJson.createRoot();
        this.elements.textarea = this.elements.root.querySelector(".json-textarea");
        this.elements.button = this.elements.root.querySelector(".json-submit");

        const textPlace = KanbanAPI.getJsonPlaceholder();
        this.elements.textarea.placeholder = "Exemple = " + textPlace;

        this.elements.button.addEventListener("click", () => {
            const temp = this.elements.textarea.value
            if(temp != "" && temp.length > 0){

                // Change logic to submit security

                console.log(JSON.parse(temp));
                KanbanAPI.setJsonData(JSON.parse(temp));

                Kanban.clearKanban(document.querySelector(".kanban"));
                new Kanban(document.querySelector(".kanban"));

                Modal.removeModal();
            }
        });
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="content-group">
            <textarea class="json-textarea"></textarea>
            <button type="button" class="button btn-default json-submit">Set Data</button>
        </div>
    `).children[0];
    }

}