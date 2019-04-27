import { MapView } from "../views/mapView.js";
import { StatisticsView } from "../views/statisticsView.js";
import { Zoo } from "../models/zoo.js";

export class ZooController {
    constructor() {
        this.mapView = new MapView(this);
        this.statisticsView = new StatisticsView();
    }

    async start() {
        const zoo = new Zoo();
        
        let jsonGrid = await fetch("../../api/grid.json");

        zoo.loadGrid(await jsonGrid.json());

        this.mapView.drawMap(zoo);

        // add map handles
        document.querySelector('.main-header').addEventListener('click', e => {
            if (e.target.dataset.map == undefined){
                return;
            }
            
            // TODO: LOAD MAP FROM API
            let mainContainer = document.querySelector(".container");
            mainContainer.classList.remove("forest", "desert", "snow");
            mainContainer.classList.add(e.target.dataset.map);
            
        });
    }

    handleClick(tile) {
        this.statisticsView.show(tile);
    }
}
