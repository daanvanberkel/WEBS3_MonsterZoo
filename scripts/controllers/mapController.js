import { MapView } from "../views/mapView.js";
import { MapService } from "../services/mapService.js";

export class MapController {

    mapName = 'forest';
    draggingTileComponent;

    constructor(mainController) {
        // Main Controller
        this.mainController = mainController;

        // Services
        this.monsterService = mainController.monsterService;
        this.mapService = new MapService();
        this.weatherService = mainController.weatherService;

        // Views
        this.mapView = new MapView(this);
        this.weatherView = mainController.weatherView;

        // Listeners
        this.addMapSwitchHandler();
        this.addTileDragHandler();
    }

    /**
     * Setup map
     * 
     * @param {string} mapName 
     */
    start(mapName) {
        this.weatherView.clearWeather();

        this.mapService.getMap(mapName).then(map => {
            this.map = map;
            this.drawMap(map);
            this.mainController.mainContainer.classList.remove('fade-out');
            this.mainController.mainContainer.classList.add('fade-in');

            this.weatherService.getWeather(map.city).then(weather => {
                this.weatherView.drawWeather(weather);
            });
        }).catch(err => {
            console.log('Cannot load map');
            console.log(err);
        });
    }

    /**
     * Add monster from monsterconfigurator to map
     * 
     * @param {Monster} monster 
     */
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

    /**
     * Add monsters from storage to the map and let the view draw the map
     * 
     * @param {Map} map 
     */
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

                        let c = parseInt(col);

                        // Skip columns where no monsters are stored
                        if (!monsters[r - 1][c - 1]) {
                            continue;
                        }

                        map.grid[r][c].monster = monsters[r - 1][c - 1];
                    }
                }
            }

            this.mapView.drawMap(map);
        });
    }

    /**
     * Handle click on tile
     * 
     * @param {Tile} tile 
     */
    handleClick(tile) {
        this.mainController.handleClick(tile);
    }

    /**
     * Add drag-drop event listeners
     */
    addTileDragHandler() {
        document.addEventListener('tileMouseDown', e => {
            this.tileMouseDown(e.detail);
        });

        document.addEventListener('tileMouseUp', e => {
            this.tileMouseUp(e.detail);
        });
    }

    /**
     * User Mousedown on tile
     */
    tileMouseDown(tileComponent){

        // cancel if not dragging a monster
        if (tileComponent.tile.monster == null){return;}

        this.draggingTileComponent = tileComponent;
        this.mapView.dragImg.src = `/images/Monsters/${tileComponent.tile.monster.typeName}/${tileComponent.tile.monster.imgFile}`;
        this.mapView.element.classList.add('drag');
        tileComponent.classList.add('hide-monster');
    }

    /**
     * User MouseUp on tile
     */
    tileMouseUp(component){

        this.mapView.element.classList.remove('drag');
        
        // cancel if no monster was dragged
        if (this.draggingTileComponent == null){ return; }

        this.draggingTileComponent.classList.remove('hide-monster');

        // check if dragged on configurator
        if (document.getElementById('configurator').contains(component)){
            this.mainController.monsterConfigurator.update(this.draggingTileComponent.tile.monster);
            this.draggingTileComponent.tile.monster = null;
            this.draggingTileComponent.render();
        }

        // cancel if placed on invalid tile
        if (component.classList.contains('free-tile') == false){ 
            this.draggingTileComponent = null;
            return; 
        }

        // set tile monster to dragged tile monster
        component.tile.monster = this.draggingTileComponent.tile.monster;

        // clear the dragged tile
        this.draggingTileComponent.tile.monster = null;

        // renders
        this.draggingTileComponent.render();
        component.render();

        this.monsterService.deleteMonster(this.mapName, this.draggingTileComponent.posY, this.draggingTileComponent.posX).then(() => {
            this.monsterService.saveMonster(component.tile.monster, this.mapName, component.posY, component.posX).then(() => {
                console.log('Monster saved');
            }).catch(err => {
                console.log("Saving monster failed");
                console.log(err);
                // TODO: Show error to user
            });
        });
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

            this.mapName = e.target.dataset.map;
            
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