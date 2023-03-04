import Modal from "../Modal.js"
export default class ButtonTriggerModal{
    constructor(root){
        const buttons = root.querySelectorAll(".button");
        buttons.forEach(element => {
            element.addEventListener("click", () => {
                this.actionTrigger(element.getAttribute("data-trigger"));  
            });
        });
    }

    actionTrigger(string){

        switch(string){
            case "add-story":  new Modal(document.querySelector(".content"), "add-story");
            break;
            case "get-json":  new Modal(document.querySelector(".content"), "get-json");
            break;
            case "set-json":  new Modal(document.querySelector(".content"), "set-json");
            break;
            case "remove-modal": Modal.removeModal();
            break;
            default: new Modal(document.querySelector(".content"), "add-story");;
        }
    }
}



