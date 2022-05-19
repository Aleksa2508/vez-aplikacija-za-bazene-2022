import {Request, Response} from "express";
import AdministratorService from './AdministratorService.service';

class AdministratorController {
    private administratorService: AdministratorService;

    constructor(administratorService: AdministratorService){
        this.administratorService = administratorService;
    }

    async getAll(req: Request, res: Response) {
        res.send(await this.administratorService.getAll());
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        const administrator = await this.administratorService.getById(id);

        if(administrator === null) {
            return res.sendStatus(404);
        }
        
        res.send(administrator);
    }
}

export default AdministratorController;