import {Request, Response} from "express";
import PeriodService from './PeriodService.service';
import BaseController from '../../common/BaseController';
import { AddPeriodValitator, IAddPeriodDto } from "./dto/IAddPeriod.dto";
import { DefaultPeriodAdapterOptions } from './PeriodService.service';
import { EditPeriodValitator, IEditPeriodDto } from './dto/IEditPeriod.dto';

export default class PeriodController extends BaseController {
   
    getAll(req: Request, res: Response) {

        let loadUsersForPeriod: boolean = true;

        if(req.authorisation?.role === "user") {
            loadUsersForPeriod = false;
        }

        this.services.period.getAll({loadUsers: loadUsersForPeriod})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        let loadUsersForPeriod: boolean = true;

        if(req.authorisation?.role === "user") {
            loadUsersForPeriod = false;
        }

        this.services.period.getById(id, {loadUsers: loadUsersForPeriod})
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

    add(req: Request, res: Response) {
        const data = req.body as IAddPeriodDto;

        if(!AddPeriodValitator) {
            return res.status(400).send(AddPeriodValitator.errors);
        }

        this.services.period.add(data)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    edit(req: Request, res: Response) {
        const id: number = +req.params?.pid;
        const data = req.body as IEditPeriodDto;

        if (!EditPeriodValitator(data)) {
            return res.status(400).send(EditPeriodValitator.errors);
        }

        this.services.period.getById(id, {loadUsers: true})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.period.editById(id, data, DefaultPeriodAdapterOptions)
                    .then (async result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    });
                                   
            })
           
        }

        addUserToAPeriod(req: Request, res: Response) {
            const id: number = +req.params?.pid;
            const data = req.body;

            this.services.period.addPeriodUser({period_id: id, user_id: data.userId})
                .then(result => {
                    console.log(result);
                    res.send(result.toString())
                })
                .catch(error => {
                    res.status(400).send("User " + data.userId + " is already in this period.");
                });
        }

        cancelPeriodUser(req: Request, res: Response) {
            const id: number = +req.params?.pid;
            const data = req.body;

            this.services.period.cancelPeriodUser({period_id: id, user_id: data.userId})
                .then(result => {
                    res.send(result.toString());
                })
                .catch(error => {
                    res.status(error.status).send(error.message);
                });
        }
}



