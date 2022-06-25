import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import PeriodService from './PeriodService.service';
import PeriodController from './PeriodController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
export default class PeriodRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
       
        const periodController: PeriodController = new PeriodController(resources.services);
        
        app.get("/api/period", /*AuthMiddleware.getVerifier("administrator", "user"),*/ periodController.getAll.bind(periodController));
        app.get("/api/period/:id", /*AuthMiddleware.getVerifier("administrator", "user"),*/ periodController.getById.bind(periodController));
        app.post("/api/period", /*AuthMiddleware.getVerifier("administrator"),*/ periodController.add.bind(periodController));
        app.put("/api/period/:pid", /*AuthMiddleware.getVerifier("administrator"),*/ periodController.edit.bind(periodController));
        app.post("/api/period/:pid", /*AuthMiddleware.getVerifier("user"),*/ periodController.addUserToAPeriod.bind(periodController));
        app.put("/api/period/:pid/cancel", /*AuthMiddleware.getVerifier("administrator", "user"),*/ periodController.cancelPeriodUser.bind(periodController));
        
    }
} 