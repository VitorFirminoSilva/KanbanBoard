import KanbanAPI from "../../../api/KanbanAPI.js";

export default class GetJson{
    constructor(){
        this.elements = {};
        this.elements.root = GetJson.createRoot();
        this.elements.textarea = this.elements.root.querySelector(".json-textarea");

        const textContent = KanbanAPI.getJsonData();
        this.elements.textarea.textContent = textContent;
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="content-group">
            <textarea class="json-textarea" readonly>
            </textarea>
        </div>
    `).children[0];
    }

}