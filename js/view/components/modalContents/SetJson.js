import KanbanAPI from "../../../api/KanbanAPI.js";
import Modal from "../Modal.js";
import Kanban from "../../Kanban.js";

export default class SetJson {
    constructor() {
        this.elements = {};
        this.elements.root = SetJson.createRoot();
        this.elements.alert = this.elements.root.querySelector(".alert");
        this.elements.textarea = this.elements.root.querySelector(".json-textarea");
        this.elements.button = this.elements.root.querySelector(".json-submit");

        const textPlace = KanbanAPI.getJsonPlaceholder();
        this.elements.textarea.placeholder = "Exemple = " + textPlace;

        this.elements.button.addEventListener("click", () => {

            const regex = /[$&+;=?@|'<>.^*()%!\-\/]/ig;

            const temp = this.elements.textarea.value;
            this.elements.alert.classList.add("hidden");
            this.elements.alert.innerText = "";

            try {

                if (temp != "" && temp.trim() != 0) {

                    const tempSanitizer = temp.replaceAll(regex, ' ');
                    const tempJson = JSON.parse(tempSanitizer);

                    if (tempJson.length === 3) {
                        tempJson.map((element, index) => {
                            if (!element.id) { throw Error(`Error: column dosn't contains ID - Index Column ${index}`); }
                            if (!element.color) { throw Error(`Error: column dosn't contains Color - Index Column ${index}`); }
                            if (!element.items) { throw Error(`Error: column dosn't contains Items List - Index Column ${index}`); }
                        });

                        tempJson.map((element, index) => {
                            const list = element.items;
                            const indColumn = index;
                            if (list.length > 0) {

                                list.map((item, index) => {
                                    if (!item.id) { throw Error(`Error: Item dosn't contains ID - Index Column ${indColumn} | Index Item ${index}`); }
                                    if (!item.content) { throw Error(`Error: Item dosn't contains Content - Index Column ${indColumn} | Index Item ${index}`); }
                                    if (!item.priority && !Number.isInteger(Number.parseInt(item.priority))) {
                                        throw Error(`Error: Item dosn't contains Priority - Index Column ${indColumn} | Index Item ${index}`);
                                    } else {
                                        const numb = Number.parseInt(item.priority);

                                        switch (numb) {
                                            case 1: item.priority = '0';
                                                break;
                                            case 3: item.priority = '2';
                                                break;
                                            case 5: item.priority = '4';
                                                break;
                                            case 7: item.priority = '6';
                                                break;
                                            case 9: item.priority = '8';
                                                break;
                                        }
                                        if (numb < 0) item.priority = '0';
                                        if (numb > 10) item.priority = '10';
                                    }
                                });

                            }
                        });


                        KanbanAPI.setJsonData(tempJson);
                        Kanban.clearKanban(document.querySelector(".kanban"));
                        new Kanban(document.querySelector(".kanban"));
                        Modal.removeModal();

                    } else {
                        throw Error(`Error: column number incorrect to update - 3 columns is correct number`);
                    }
                }else{
                    throw Error(`Error: Textarea is empty`);
                }
            } catch (error) {
                this.elements.alert.classList.remove("hidden");
                this.elements.alert.innerText = error.message;
            }

        });
    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="content-group">
            <span class="alert hidden"></span>
            <textarea class="json-textarea"></textarea>
            <button type="button" class="button btn-default json-submit">Set Data</button>
        </div>
    `).children[0];
    }

}