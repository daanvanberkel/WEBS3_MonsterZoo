import { MapView } from "../views/mapView.js";
import { StatisticsView } from "../views/statisticsView.js";
import { Zoo } from "../models/zoo.js";

export class ZooController {
    constructor() {
        this.mapView = new MapView(this);
        this.statisticsView = new StatisticsView();

        this.addMapSwitchHandlers();
    }

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

        
    }

    handleClick(tile) {
        this.statisticsView.show(tile);
    }

    addMapSwitchHandlers(){

        document.querySelector('.main-header').addEventListener('click', e => {
            if (e.target.dataset.map == undefined){
                return;
            }
            
            // TODO: LOAD MAP FROM API

            // add class to map
            let mainContainer = document.querySelector(".container");
            mainContainer.classList.remove("forest", "desert", "snow");
            mainContainer.classList.add(e.target.dataset.map);

            // disable clicked button
            let buttons = document.querySelectorAll('.map_button');
            buttons.forEach(button => button.disabled = false);
            e.target.disabled = true;

            this.start(e.target.dataset.map);
        });
    }
}
