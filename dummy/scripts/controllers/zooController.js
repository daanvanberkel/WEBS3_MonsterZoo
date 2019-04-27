import { MapView } from "../views/mapView.js";
import { Zoo } from "../models/zoo.js";
import { StatisticsView } from "../views/statisticsView.js";

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
    }

    handleClick(tile) {
        this.statisticsView.show(tile);
    }
}
