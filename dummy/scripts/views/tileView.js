import { EmptyTile } from "../models/emptyTile.js";

export class TileView {
    drawTile(element, tile) {
        if (tile instanceof EmptyTile) {
        //     element.style.background = 'blue';
            element.classList.add('empty-tile');
            return;
        }

        if (!tile.roomForMonster) {
            let randomImageId = Math.floor(Math.random() * 3) + 1;
            element.classList.add(`obstacle-${randomImageId}`);
        }
    }
}
