import {Request, Response} from "express";
import PeriodService from './PeriodService.service';

class PeriodController {
    private periodService: PeriodService;

    constructor(periodService: PeriodService){
        this.periodService = periodService;
    }

    async getAll(req: Request, res: Response) {
        res.send(await this.periodService.getAll());
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        const period = await this.periodService.getById(id);

        if (period === null) {
            return res.send(404);
        }

        res.send(period);
    }

}