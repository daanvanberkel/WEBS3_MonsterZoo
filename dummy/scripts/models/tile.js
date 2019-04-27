export class Tile {
    monster;
    isObstacle = false;
    isBorderTile = false

    constructor(properties){
        
        if (properties == undefined){
            return;
        }

        for(var item in properties){
            this[item] = properties[item];
        }
    }

    setObstacleTile(){
        this.isObstacle = true;
    }
}