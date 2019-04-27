import { Tile } from "./tile.js";

export class Zoo {
    name = '';
    climate = '';
    city = '';
    grid = [];


    /**
     * Load object properties from json data.
     * 
     * @param {JSON} json 
     */
    loadGrid(json) {
        
        // check if json is valid
        if (
            !json.name ||
            !json.climate ||
            !json['reference city']||
            !json.grid
        ) {
            console.log('JSON not valid');
            return;
        }
        
        this.name = json.name;
        this.climate = json.climate;
        this.city = json['reference city'];

        // loop trough grid rows
        for(let jsonRow of json.grid) {
            
            let tileRow = []

            // TODO: Check if monsters are saved in localstorage and place monsters in right cages
            
            // add the column to the row
            for(let jsonCol of jsonRow.Columns) {

                const tile = new Tile();
                
                // set obstacle tile if true
                if (jsonCol == 1) {
                    tile.isObstacle = true;
                }

                tileRow.push(tile);
            }

            // add row to grid
            this.grid.push(tileRow);
        }

        // add left and right border for each row
        for(let rowIndex in this.grid){
            this.grid[rowIndex].unshift(new Tile({isBorderTile: true}));
            this.grid[rowIndex].push(new Tile({isBorderTile: true}));
        }

        // add top and bottom row
        this.grid.unshift(Array(12).fill(new Tile({isBorderTile: true})))
        this.grid.push(Array(12).fill(new Tile({isBorderTile: true})))
    }
}
