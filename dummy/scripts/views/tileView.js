export class TileView {

    constructor(tile){
        this.tile = tile;
    }

    drawTile(){
        let htmlTile = document.createElement('div');
        htmlTile.classList.add('tile');

        if (this.tile.isBorderTile) {
            htmlTile.classList.add('empty-tile');
        }

        if (this.tile.isObstacle) {
            let randomImageId = Math.floor(Math.random() * 3) + 1;
            htmlTile.classList.add(`obstacle-${randomImageId}`);
        }
        
        return htmlTile;
    }
}
