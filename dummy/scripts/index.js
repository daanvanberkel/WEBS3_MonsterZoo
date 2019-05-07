"use strict";

import { ZooController } from "./controllers/zooController.js";
import { MonsterConfiguratorComponent } from "./components/monsterConfigurator.js";

window.customElements.define('monster-configurator', MonsterConfiguratorComponent);

const zooController = new ZooController();
zooController.start('forest');
