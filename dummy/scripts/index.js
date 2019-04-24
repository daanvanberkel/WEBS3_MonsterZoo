"use strict";

import { ZooController } from "./controllers/zooController.js";

const zooController = new ZooController(document.querySelector('#zoo'));
zooController.start();
