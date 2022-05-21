import {Request, Response} from "express";
import AdministratorService from './AdministratorService.service';
import { AddAdministratorValitator } from "./dto/IAddAdministrator.dto";
import IAddAdministrator from './dto/IAddAdministrator.dto';

class AdministratorController {
    private administratorService: AdministratorService;

    constructor(administratorService: AdministratorService){
        this.administratorService = administratorService;
    }

    async getAll(req: Request, res: Response) {
        this.administratorService.getAll({})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.administratorService.getById(id, {})
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
    
    async add(req: Request, res: Response) {
        const data = req.body as IAddAdministrator;

        // Validacija

        if(!AddAdministratorValitator(data)){
            return res.status(400).send(AddAdministratorValitator.errors);
        }

        this.administratorService.add(data)
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });
    }
}

export default AdministratorController;