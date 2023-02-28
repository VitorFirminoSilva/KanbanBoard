import Modal from "../Modal.js"
export default class ButtonTriggerModal{
    constructor(){
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(element => element.addEventListener("click", () => {
            new Modal(document.querySelector(".content"), element.getAttribute("data-trigger"));  
        }));
    }
}



