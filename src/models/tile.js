export class Tile {
    constructor(data){
        this.monster = data ? data.monster : null;
        this.isObstacle = data ? data.isObstacle : false;
        this.isBorderTile = data ? data.isBorderTile : false;
        this.row = data ? data.row : null; 
        this.col = data ? data.col : null;
    }
}