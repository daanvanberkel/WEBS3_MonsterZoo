"use strict";

import { ZooController } from "./controllers/zooController.js";
import { MonsterConfiguratorComponent } from "./components/monsterConfigurator.js";
import { TileComponent } from "./components/tile.js";

window.customElements.define('monster-configurator', MonsterConfiguratorComponent);
window.customElements.define('tile-component', TileComponent);

const zooController = new ZooController();
zooController.start('forest');
