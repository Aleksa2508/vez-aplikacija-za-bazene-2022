import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import PeriodService from './PeriodService.service';
import PeriodController from './PeriodController.controller';
export default class PeriodRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
       
        const periodController: PeriodController = new PeriodController(resources.services);
        
        app.get("/api/period", periodController.getAll.bind(periodController));
        app.get("/api/period/:id", periodController.getById.bind(periodController));
        app.post("/api/period", periodController.add.bind(periodController));
        app.put("/api/period/:pid", periodController.edit.bind(periodController));
        
    }
} 