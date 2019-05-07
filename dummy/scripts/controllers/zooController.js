import { MapView } from "../views/mapView.js";
import { StatisticsView } from "../views/statisticsView.js";
import { Zoo } from "../models/zoo.js";

export class ZooController {

    /**
     * Bind all views to the controller,
     * adding eventhandlers to DOMElements
     */
    constructor() {
        this.mapView = new MapView(this);
        this.statisticsView = new StatisticsView();
        this.mainContainer = document.querySelector(".container");
        this.addMapSwitchHandlers();
    }

    
    /**
     * Load grid from grid.json
     * 
     * @param {String} gridName 
     */
    async start(gridName) {
        const zoo = new Zoo();
        
        let request = await fetch("../../api/grid.json");
        let jsonGrids = await request.json();

        let jsonGrid = jsonGrids.find(grid => grid.name == gridName);

        if (jsonGrid == undefined){
            return;
        }

        zoo.loadGrid(jsonGrid);

        this.mapView.drawMap(zoo);

        this.mainContainer.classList.remove('fade-out');
        this.mainContainer.classList.add('fade-in');
    }


    /**
     * Trigger: When user clicks on a tile
     * @param {Tile} tile 
     */
    handleClick(tile) {
        this.statisticsView.show(tile);
    }

    /**
     * Add Eventhanders to map switch buttons
     * with animations
     */
    async addMapSwitchHandlers(){
        
        document.querySelector('.main-header').addEventListener('click', e => {
            if (e.target.dataset.map == undefined){
                return;
            }
            
            // TODO: LOAD MAP FROM API

            // fade map out
            this.mainContainer.classList.remove('fade-in');
            this.mainContainer.classList.add('fade-out');

            // wait for fade out
            setTimeout(() => {
                
                this.mainContainer.classList.remove("forest", "desert", "snow");
                this.mainContainer.classList.add(e.target.dataset.map);

                // disable clicked button
                let buttons = document.querySelectorAll('.map_button');
                buttons.forEach(button => button.disabled = false);
                e.target.disabled = true;

                this.start(e.target.dataset.map);
            }, 500);
            
        });
    }
}
