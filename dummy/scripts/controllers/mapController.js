import { MapView } from "../views/mapView.js";

export class MapController {
    constructor(zooController) {
        this.zooController = zooController;
        this.mapView = new MapView(this);
        this.addMapSwitchHandler();
    }

    addMonster(monster) {
        // find free tile
        let tiles = Array.from(document.querySelectorAll("tile-component"));

        let freeTiles = tiles.filter(tile => tile.classList.contains('free-tile'));

        if (freeTiles.length > 0){
            let freeTile =  freeTiles[0]
            freeTile.tile.monster = monster;
            freeTile.render();
        }
    }

    drawMap(zoo) {
        this.mapView.drawMap(zoo);
    }

    handleClick(tile) {
        this.zooController.handleClick(tile);
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
            this.zooController.mainContainer.classList.remove('fade-in');
            this.zooController.mainContainer.classList.add('fade-out');

            // wait for fade out
            setTimeout(() => {
                
                this.zooController.mainContainer.classList.remove("forest", "desert", "snow");
                this.zooController.mainContainer.classList.add(e.target.dataset.map);

                // disable clicked button
                let buttons = document.querySelectorAll('.map_button');
                buttons.forEach(button => button.disabled = false);
                e.target.disabled = true;

                this.zooController.start(e.target.dataset.map);
            }, 500);
            
        });
    }
}