"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dev_config_1 = require("./config/dev.config");
const AdministratorController_controller_1 = require("./components/administrator/AdministratorController.controller");
const AdministratorService_service_1 = require("./components/administrator/AdministratorService.service");
const config = dev_config_1.default;
const app = express();
app.use(cors());
app.use(express.json());
app.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
}));
const administratorService = new AdministratorService_service_1.default();
const administratorController = new AdministratorController_controller_1.default(administratorService);
app.get("api/administrator", administratorController.getAll.bind(administratorController));
app.get("api/administrator/:id", administratorController.getById.bind(administratorController));
app.use((req, res) => {
    res.sendStatus(404);
});
app.listen(config.server.port);
//# sourceMappingURL=main.js.map