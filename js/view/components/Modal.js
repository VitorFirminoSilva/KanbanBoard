import NewStory from "./modalContents/NewStory.js";
export default class Modal{
    constructor(root, content){
        this.root = root;
        this.elements = {};

        this.elements.root = Modal.createRoot();
        this.elements.buttonClose = this.elements.root.querySelector("#modal-close");
        this.elements.content = this.elements.root.querySelector(".modal-content");

        this.elements.buttonClose.addEventListener("click", e => {
            this.elements.root.parentElement.removeChild(this.elements.root);
        });

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
                <button class="modal-close-btn" id="modal-close">&#10006;</button>
                <div class="modal-content"></div>
            </div>
        </div>
    `).children[0];
    }

    getContent(content){
        switch(content){
            case "add-story": return new NewStory();
   
            default: return new NewStory();
        }
    }
}