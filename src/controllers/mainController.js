import { StatisticsView } from "../views/statisticsView.js";
import { MapController } from "./mapController.js";
import { MonsterService } from "../services/monsterService.js";
import { MonsterConfiguratorComponent } from "../components/monsterConfigurator.js";
import { TileComponent } from "../components/tileComponent.js";
import { WeatherService } from "../services/weatherService.js";
import { WeatherView } from "../views/weatherView.js";

export class MainController {

    /**
     * Bind all views to the controller,
     * adding eventhandlers to DOMElements
     */
    constructor() {
        // Register custom components
        window.customElements.define('monster-configurator', MonsterConfiguratorComponent);
        window.customElements.define('tile-component', TileComponent);

        // Services
        this.monsterService = new MonsterService();
        this.weatherService = new WeatherService();

        // Views
        this.statisticsView = new StatisticsView();
        this.weatherView = new WeatherView();
        this.mainContainer = document.querySelector(".container");
        this.monsterConfigurator = document.querySelector('monster-configurator');

        // Controllers
        this.mapController = new MapController(this);

        // Event listeners
        this.handleMonsterClick();
        this.monsterConfigurator.addEventListener('monsterCreated', e => this.mapController.addMonster(e.detail));
        this.monsterConfigurator.addEventListener('monsterUpdated', e => this.mapController.updateMonster(e.detail));
    }

    start(mapName) {
        this.mapController.start(mapName);    
    }

    handleMonsterClick() {
        document.addEventListener('monsterClicked', e => {
            this.showMonsterStatistics(e.detail);
        });
    }

    showMonsterStatistics(monster) {
        this.statisticsView.show(monster);
    }
}
