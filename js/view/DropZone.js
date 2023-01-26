import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone{
    static createDropZone(){
        const range = document.createRange();
        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban-dropzone"></div>
        `).children[0];

        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban-dropzone--active");
        });

        dropZone.addEventListener("dragleave", e => {
            dropZone.classList.remove("kanban-dropzone--active");
        });

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban-dropzone--active");

            const columnElement = dropZone.closest(".kanban-column");
            const columnId = Number(columnElement.dataset.id);
            const dropZoneInColumn = Array.from(columnElement.querySelector(".kanban-dropzone"));
            const droppedIndex = dropZoneInColumn.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));

            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            
            const insertAfter = dropZone.parentElement.classList.contains("kanban-item") ? dropZone.parentElement : dropZone;

            if(droppedItemElement.contains(dropZone)){
                return;
            }

            const droppedItemElementIcon = droppedItemElement.querySelector(".kanban-item-status-icon");
            const columnColor = KanbanAPI.getColor(columnId);
            droppedItemElementIcon.style.background = columnColor;


            insertAfter.after(droppedItemElement);

            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });
        });

        return dropZone;
    }
}