
import * as express from "express";
import IApplicationResources from '../../common/IApplicationResources.interface';
import AdministratorController from "./AdministratorController.controller";
import AdministratorService from './AdministratorService.service';
import IRouter from '../../common/IRouter.interface';




export default class AdministratorRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        const administratorService: AdministratorService = new AdministratorService(resources.datebaseConnection);
        const administratorController: AdministratorController = new AdministratorController(administratorService);
        
        app.get("/api/administrator", administratorController.getAll.bind(administratorController));
        app.get("/api/administrator/:id", administratorController.getById.bind(administratorController));
        app.post("/api/administrator", administratorController.add.bind(administratorController));
    }
}