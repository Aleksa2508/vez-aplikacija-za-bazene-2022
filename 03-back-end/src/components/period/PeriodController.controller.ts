import {Request, Response} from "express";
import PeriodService from './PeriodService.service';

export default class PeriodController {
    private periodService: PeriodService;

    constructor(periodService: PeriodService){
        this.periodService = periodService;
    }

    async getAll(req: Request, res: Response) {
        this.periodService.getAll({})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.periodService.getById(id, {})
            .then(result => {
                if(result === null){
                    return res.sendStatus(404);
                }
                
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

}