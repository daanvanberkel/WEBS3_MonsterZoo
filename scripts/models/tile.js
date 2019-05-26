export class Tile {
    monster;
    isObstacle = false;
    isBorderTile = false;
    row;
    col;

    constructor(data){
        Object.assign(this, data);
    }
}