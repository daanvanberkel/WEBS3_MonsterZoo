import { MapView } from "../views/mapView.js";
import { MapService } from "../services/mapService.js";

export class MapController {
    constructor(mainController) {
        // Main Controller
        this.mainController = mainController;

        // Services
        this.monsterService = mainController.monsterService;
        this.mapService = new MapService();

        // Views
        this.mapView = new MapView();

        // Listeners
        this.addMapSwitchHandler();
    }

    start(mapName) {
        this.mapService.getMap(mapName).then(map => {
            this.map = map;
            this.drawMap(map);

            this.mainController.mainContainer.classList.remove('fade-out');
            this.mainController.mainContainer.classList.add('fade-in');
        }).catch(err => {
            console.log('Cannot load map');
            console.log(err);
        });
    }

    addMonster(monster) {
        // find free tile
        let tiles = Array.from(document.querySelectorAll("tile-component"));

        let freeTiles = tiles.filter(tile => tile.classList.contains('free-tile'));

        if (freeTiles.length > 0){
            let freeTile = freeTiles[0];
            this.monsterService.saveMonster(monster, this.map.name, freeTile.tile.row, freeTile.tile.col).then(() => {
                // Success
                console.log('Monster saved');

                freeTile.tile.monster = monster;
                freeTile.render();
            }).catch(err => {
                // Error
                console.log('Failed to save monster');
                console.log(err);

                // TODO: Handle error in a nice way
            });
        }
    }

    drawMap(map) {
        // Show saved monsters on the map
        this.monsterService.getMonsters(map.name).then(monsters => {
            if (monsters) {
                for(let row in map.grid) {
                    let r = parseInt(row);

                    // Skip border rows
                    if (r == 0 || r == map.grid.length - 1) {
                        continue;
                    }

                    // Skip rows where no monsters are stored
                    if (!monsters[r - 1]) {
                        continue;
                    }

                    for(let col in map.grid[r]) {
                        // Skip border columns
                        if (col == 0 || col == map.grid[r].length - 1) {
                            continue;
                        }

                        // Skip columns where no monsters are stored
                        if (!monsters[r - 1][col]) {
                            continue;
                        }
                        
                        let c = parseInt(col);

                        map.grid[r][c + 1].monster = monsters[r - 1][c];
                    }
                }
            }

            this.mapView.drawMap(map);
        });
    }

    handleClick(tile) {
        this.mainController.handleClick(tile);
    }

    /**
     * Add Eventhanders to map switch buttons
     * with animations
     */
    addMapSwitchHandler() {
        document.querySelector('.main-header').addEventListener('click', e => {
            if (e.target.dataset.map == undefined){
                return;
            }
            
            // TODO: LOAD MAP FROM API

            // fade map out
            this.mainController.mainContainer.classList.remove('fade-in');
            this.mainController.mainContainer.classList.add('fade-out');

            // wait for fade out
            setTimeout(() => {
                
                this.mainController.mainContainer.classList.remove("forest", "desert", "snow");
                this.mainController.mainContainer.classList.add(e.target.dataset.map);

                // disable clicked button
                let buttons = document.querySelectorAll('.map_button');
                buttons.forEach(button => button.disabled = false);
                e.target.disabled = true;

                this.mainController.start(e.target.dataset.map);
            }, 500);
            
        });
    }
}