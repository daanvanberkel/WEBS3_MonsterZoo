import { TileView } from "./tileView.js";

export class MapView {
    zoo;

    constructor(controller) {
        this.element = document.querySelector('#zoo');
        this.controller = controller;
        this.tileView = new TileView();
    }

    drawMap() {
        if (!this.zoo) {
            return;
        }
    
        const grid = document.createElement('div');
        grid.classList.add('grid');

        for(let r of this.zoo.grid) {
            const row = document.createElement('div');
            row.classList.add('row');

            for(let tile of r) {
                const col = document.createElement('div');
                col.classList.add('tile');
                col.addEventListener('click', e => {
                    this.controller.handleClick(tile);
                });

                this.tileView.drawTile(col, tile);

                row.appendChild(col);
            }

            grid.appendChild(row);
        }

        this.element.appendChild(grid);
    }
}
