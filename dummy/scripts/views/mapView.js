export class MapView {
    controller;
    dragImg;

    constructor(controller) {
        this.controller = controller;
        this.element = document.querySelector('#zoo');
    }

    /**
     * Render HTML layout from Map Model
     * 
     * @param {Models/Map} map
     */
    drawMap(map) {
        // clear grid
        this.element.innerHTML = "";

        // create grid
        const grid = document.createElement('div');
        grid.classList.add('grid');

        // loop trough rows in map grid
        let rowCount = -1;  // -1 compensate for borders
        for(let row of map.grid) {

            // create html row
            const htmlRow = document.createElement('div');
            htmlRow.classList.add('row');
            
            // loop trough tiles in the row
            let colCount = -1; // -1 compensate for borders
            for(let tile of row) {

                // create html of the tile
                let t = document.createElement('tile-component');
                t.tile = tile;
                t.posY = rowCount;
                t.posX = colCount;

                t.addEventListener("mousedown", (e)=>{
                    this.controller.tileMouseDown(e.target);
                });

                t.addEventListener("mouseup", (e)=>{
                    this.controller.tileMouseUp(e.target);
                });

                htmlRow.appendChild(t);

                colCount++;
            }

            grid.appendChild(htmlRow);

            rowCount++;
        }

        this.element.appendChild(grid);

        // add draggable img
        this.dragImg = document.createElement('img');
        this.dragImg.src = '/images/Monsters/Water/Water1.png';
        this.dragImg.classList.add('dragImg');
        this.element.appendChild(this.dragImg);

        this.element.addEventListener("mousemove", (e) => {
            this.dragImg.style.top = e.clientY - 32;
            this.dragImg.style.left = e.clientX - 32;
        });

    }

}