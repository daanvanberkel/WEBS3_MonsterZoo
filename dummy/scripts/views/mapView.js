export class MapView {
    controller;

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
        for(let row of map.grid) {

            // create html row
            const htmlRow = document.createElement('div');
            htmlRow.classList.add('row');
            
            // loop trough tiles in the row
            for(let tile of row) {

                // create html of the tile
                let t = document.createElement('tile-component');
                t.tile = tile;
                
                t.addEventListener("mousedown", (e)=>{
                    this.controller.tileMouseDown(e.target);
                });

                t.addEventListener("mouseup", (e)=>{
                    this.controller.tileMouseUp(e.target);
                });

                htmlRow.appendChild(t);
            }

            grid.appendChild(htmlRow);
        }

        this.element.appendChild(grid);
    }
}