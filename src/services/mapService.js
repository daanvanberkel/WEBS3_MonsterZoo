import { Map } from "../models/map.js";
import { Tile } from "../models/tile.js";
import grid from "../api/grid.json";

export class MapService {
    getMap(mapName) {
        return new Promise((resolve, reject) => {
            const map = new Map();

            let jsonGrid = grid.find(grid => grid.name == mapName);

            if (jsonGrid == undefined) {
                return;
            }

            // check if json is valid
            if (
                !jsonGrid.name ||
                !jsonGrid.climate ||
                !jsonGrid['reference city']||
                !jsonGrid.grid
            ) {
                reject(new Error("JSON grid is not properly formatted."));
                return;
            }
            
            map.name = jsonGrid.name;
            map.climate = jsonGrid.climate;
            map.city = jsonGrid['reference city'];

            // loop trough grid rows
            for(let [i, jsonRow] of jsonGrid.grid.entries()) {
                let tileRow = [];
                
                // add the column to the row
                for(let [j, jsonCol] of jsonRow.Columns.entries()) {
                    const tile = new Tile();
                    tile.row = i;
                    tile.col = j;
                    
                    // set obstacle tile if true
                    if (jsonCol == 1) {
                        tile.isObstacle = true;
                    }

                    tileRow.push(tile);
                }

                // add row to grid
                map.grid.push(tileRow);
            }

            // add left and right border for each row
            for(let rowIndex in map.grid){
                map.grid[rowIndex].unshift(new Tile({isBorderTile: true}));
                map.grid[rowIndex].push(new Tile({isBorderTile: true}));
            }

            // add top and bottom row
            map.grid.unshift(Array(12).fill(new Tile({isBorderTile: true})))
            map.grid.push(Array(12).fill(new Tile({isBorderTile: true})))

            resolve(map);
        });
    }
}
