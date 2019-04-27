import { TileView } from "./tileView.js";

export class MapView {

    /**
     * Bind to HTML element and ZooController
     * 
     * @param {ZooController} controller 
     */
    constructor(zooController) {
        this.element = document.querySelector('#zoo');
        this.controller = zooController;
    }

    /**
     * Render HTML layout from Zoo Model
     * 
     * @param {Models/Zoo} zoo
     */
    drawMap(zoo) {

        // stop render if model empty
        if (!zoo) {
            return;
        }

        // create grid
        const grid = document.createElement('div');
        grid.classList.add('grid');

        // loop trough rows in zoo grid
        for(let row of zoo.grid) {

            // create html row
            const htmlRow = document.createElement('div');
            htmlRow.classList.add('row');
            
            // loop trough tiles in the row
            for(let tile of row) {

                // create html of the tile
                let htmlTile = new TileView(tile).drawTile();

                htmlTile.addEventListener('click', e => {
                    this.controller.handleClick(tile);
                });

                htmlRow.appendChild(htmlTile);
            }

            grid.appendChild(htmlRow);
        }

        this.element.appendChild(grid);
    }
}