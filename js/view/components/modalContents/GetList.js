import KanbanAPI from "../../../api/KanbanAPI.js";

export default class GetList{
    constructor(){
        this.elements = {};
        this.elements.root = GetList.createRoot();
        this.elements.textarea = this.elements.root.querySelector(".json-textarea");

        let textContent = KanbanAPI.getJsonData();
        textContent = GetList.transformJsonToList(textContent);
        this.elements.textarea.textContent = textContent;
    }

    static transformJsonToList(content){
        const array = ["Not Started", "In Progress", "Completed"];
        const json = JSON.parse(content);
        let text = "";
        json.map((element) => {
           text += `${array[element.id-1]}\n`;

           element.items.map((item) => {
                text += `   - ${item.content}\n`;
           });
           text += `\n`;
        });

        return text;
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