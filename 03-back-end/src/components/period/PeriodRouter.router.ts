import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import PeriodService from './PeriodService.service';
import PeriodController from './PeriodController.controller';
export default class PeriodRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        const periodService: PeriodService = new PeriodService(resources.datebaseConnection);
        const periodController: PeriodController = new PeriodController(periodService);
        
        app.get("/api/period", periodController.getAll.bind(periodController));
        app.get("/api/period/:id", periodController.getById.bind(periodController));
        //app.post("/api/user", periodController.add.bind(periodController));
    }
} 