import { StatisticsView } from "../views/statisticsView.js";
import { Zoo } from "../models/zoo.js";
import { MapController } from "./mapController.js";

export class ZooController {

    /**
     * Bind all views to the controller,
     * adding eventhandlers to DOMElements
     */
    constructor() {
        this.mapController = new MapController(this);
        this.statisticsView = new StatisticsView();
        this.mainContainer = document.querySelector(".container");
        this.monsterConfigurator = document.querySelector('monster-configurator');

        // pass monster to mapController if user clicks on 'Save'
        this.monsterConfigurator.addEventListener('monsterCreated', e => this.mapController.addMonster(e.detail));
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

        this.mapController.drawMap(zoo);

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
}
