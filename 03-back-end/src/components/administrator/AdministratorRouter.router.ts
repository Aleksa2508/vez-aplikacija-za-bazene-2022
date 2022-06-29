
import * as express from "express";
import IApplicationResources from '../../common/IApplicationResources.interface';
import AdministratorController from "./AdministratorController.controller";
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';




export default class AdministratorRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        
        const administratorController: AdministratorController = new AdministratorController(resources.services);
        
        app.get("/api/administrator", AuthMiddleware.getVerifier("administrator"),  administratorController.getAll.bind(administratorController));
        app.get("/api/administrator/:id", AuthMiddleware.getVerifier("administrator"),  administratorController.getById.bind(administratorController));
        app.post("/api/administrator", AuthMiddleware.getVerifier("administrator"),  administratorController.add.bind(administratorController));
        app.put("/api/administrator/:aid", AuthMiddleware.getVerifier("administrator"),  administratorController.editById.bind(administratorController));
    }
}