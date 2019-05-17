export class Tile {
    monster;
    isObstacle = false;
    isBorderTile = false;
    row;
    col;


    /**
     * Fill local properties from JSON Array
     * 
     * @param {JSON} properties 
     */
    constructor(properties){
        
        if (properties == undefined){
            return;
        }

        for(var item in properties){
            this[item] = properties[item];
        }
    }
}