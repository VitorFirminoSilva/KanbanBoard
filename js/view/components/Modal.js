import InputNewStory from "./modalContents/InputNewStory.js";
export default class Modal{
    constructor(root){
        this.root = root;
        this.elements = {};

        this.elements.root = Modal.createRoot();
        this.elements.buttonClose = this.elements.root.querySelector("#modal-close");
        this.elements.content = this.elements.root.querySelector(".modal-content");

        this.elements.buttonClose.addEventListener("click", e => {
            this.elements.root.parentElement.removeChild(this.elements.root);
        });

        const input = new InputNewStory();
        this.elements.content.appendChild(input.elements.root);

        this.root.appendChild(this.elements.root);
    }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="modal">
            <div class="modal-body">
                <button class="modal-close-btn" id="modal-close">&#10006;</button>
                <div class="modal-content"></div>
            </div>
        </div>
    `).children[0];
    }
}