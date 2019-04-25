import { EmptyTile } from "../models/emptyTile.js";

export class CageView {
    drawCage(element, cage) {
        if (cage instanceof EmptyTile) {
        //     element.style.background = 'blue';
            element.classList.add('empty-tile');
            return;
        }

        if (!cage.roomForMonster) {
        //     element.style.background = 'brown';
            element.classList.add('obstacle');
        // } else {
        //     element.style.background = 'green';
        }
    }
}
