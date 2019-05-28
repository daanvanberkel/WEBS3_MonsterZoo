"use strict";

import { MainController } from "./controllers/mainController.js";
import './scss/style.scss';

const ctrl = new MainController();
ctrl.start('forest');
