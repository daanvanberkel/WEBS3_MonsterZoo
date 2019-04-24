import { ZooView } from "../views/zooView.js";
import { Zoo } from "../models/zoo.js";
import { StatisticsView } from "../views/statisticsView.js";

export class ZooController {
    constructor() {
        this.zooView = new ZooView(this);
        this.statisticsView = new StatisticsView();
    }

    start() {
        const zoo = new Zoo();
        zoo.loadGrid(`
        {
            "name":"Jungle",
            "climate":"bear grylls approved temperature",
            "reference city": "Rio",
            "grid": [
                { "name":"Row1", "Columns":[ "1", "0", "0", "0", "1", "1", "0", "0", "0","1" ] },
                { "name":"Row2", "Columns":[ "1", "0", "0", "1", "0", "0", "1", "0", "0","1" ] },
                { "name":"Row3", "Columns":[ "1", "0", "1", "0", "0", "0", "0", "1", "0","1" ] },
                { "name":"Row4", "Columns":[ "1", "1", "0", "0", "0", "0", "0", "0", "1","1" ] },
                { "name":"Row5", "Columns":[ "1", "0", "0", "0", "0", "0", "0", "0", "0","1" ] },
                { "name":"Row6", "Columns":[ "1", "1", "0", "0", "0", "0", "0", "0", "0","1" ] },
                { "name":"Row7", "Columns":[ "1", "0", "1", "0", "0", "0", "0", "0", "0","1" ] },
                { "name":"Row8", "Columns":[ "1", "0", "0", "1", "0", "0", "0", "0", "0","1" ] },
                { "name":"Row9", "Columns":[ "1", "0", "0", "0", "1", "1", "0", "0", "0","1" ] },
                { "name":"Row10", "Columns":[ "1", "0", "0", "0", "1", "1", "0", "0", "0","1" ] }
            ]
        }
        `);

        this.zooView.zoo = zoo;

        this.zooView.drawZoo();
    }

    handleClick(cage) {
        this.statisticsView.show(cage);
    }
}
