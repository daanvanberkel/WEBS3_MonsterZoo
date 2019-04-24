import { CageView } from "./cageView.js";

export class ZooView {
    zoo;

    constructor(controller) {
        this.element = document.querySelector('#zoo');
        this.controller = controller;
        this.cageView = new CageView();
    }

    drawZoo() {
        if (!this.zoo) {
            return;
        }

        const grid = document.createElement('div');
        grid.classList.add('zoo-grid');

        for(let r of this.zoo.grid) {
            const row = document.createElement('div');
            row.classList.add('zoo-row');

            for(let cage of r) {
                const col = document.createElement('div');
                col.classList.add('zoo-cage');
                col.addEventListener('click', e => {
                    this.controller.handleClick(cage);
                });

                this.cageView.drawCage(col, cage);

                row.appendChild(col);
            }

            grid.appendChild(row);
        }

        this.element.appendChild(grid);
    }
}
