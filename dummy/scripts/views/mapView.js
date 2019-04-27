import { TileView } from "./tileView.js";

export class MapView {

    constructor(controller) {
        this.element = document.querySelector('#zoo');
        this.controller = controller;
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

                let objTile = new TileView(tile);
                let htmlTile = objTile.drawTile();

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
