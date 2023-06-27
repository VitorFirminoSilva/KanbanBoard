import ButtonTriggerModal from "./Buttons/ButtonTriggerModal.js";
import NewStory from "./modalContents/NewStory.js";
import GetJson from "./modalContents/GetJson.js";
import SetJson from "./modalContents/SetJson.js";
import GetList from "./modalContents/GetList.js";

export default class Modal{
    constructor(root, content){
        this.root = root;
        this.elements = {};

        this.elements.root = Modal.createRoot();
        this.elements.buttonClose = this.elements.root.querySelector("#modal-close");
        this.elements.content = this.elements.root.querySelector(".modal-content");

        new ButtonTriggerModal(this.elements.root);

        const input = this.getContent(content);
        this.elements.content.appendChild(input.elements.root);

        this.root.appendChild(this.elements.root);
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="modal">
            <div class="modal-body">
                <button class="button modal-close-btn" data-trigger="remove-modal" id="modal-close">&#10006;</button>
                <div class="modal-content"></div>
            </div>
        </div>
    `).children[0];
    }

    static removeModal(){
        const modal = document.querySelector(".modal");
        modal.parentElement.removeChild(modal);
    }

    getContent(content){
        switch(content){
            case "add-story": return new NewStory();
            break;
            case "get-json": return new GetJson();
            break;
            case "set-json": return new SetJson();
            break;
            case "get-list": return new GetList();
            break;
            default: return new NewStory();
        }
    }
}