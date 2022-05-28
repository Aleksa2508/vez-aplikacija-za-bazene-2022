
import * as express from "express";
import IApplicationResources from '../../common/IApplicationResources.interface';
import AdministratorController from "./AdministratorController.controller";
import IRouter from '../../common/IRouter.interface';




export default class AdministratorRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        
        const administratorController: AdministratorController = new AdministratorController(resources.services);
        
        app.get("/api/administrator", administratorController.getAll.bind(administratorController));
        app.get("/api/administrator/:id", administratorController.getById.bind(administratorController));
        app.post("/api/administrator",                        administratorController.add.bind(administratorController));
        app.put("/api/administrator/:aid",                    administratorController.editById.bind(administratorController));
    }
}