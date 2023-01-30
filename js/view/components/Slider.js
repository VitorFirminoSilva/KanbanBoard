export default class Slider {
    constructor() {
        this.elements = {};
        this.elements.root = Slider.createRoot();
        this.elements.inputArray = this.elements.root.querySelectorAll(".priority-level");

    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="slider-container">
            <h3>Priority Level</h3>
            <div class="dot-slider">
                <input type="radio" checked class="priority-level" name="priority-level" id="1" value="0">
                <label for="1" data-priority-level="0"></label>

                <input type="radio" class="priority-level" name="priority-level" id="2" value="2">
                <label for="2" data-priority-level="2"></label>

                <input type="radio" class="priority-level" name="priority-level" id="3" value="4">
                <label for="3" data-priority-level="4"></label>

                <input type="radio" class="priority-level" name="priority-level" id="4" value="6">
                <label for="4" data-priority-level="6"></label>

                <input type="radio" class="priority-level" name="priority-level" id="5" value="8">
                <label for="5" data-priority-level="8"></label>

                <input type="radio" class="priority-level" name="priority-level" id="6" value="10">
                <label for="6" data-priority-level="10"></label>

                <div class="dot-input-label"></div>
            </div>
        </div>   
    `).children[0];
    }


}