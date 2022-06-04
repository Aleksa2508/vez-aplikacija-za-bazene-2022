import {Request, Response} from "express";
import BaseController from "../../common/BaseController";
import { AddAdministratorValitator, IAddAdministratorDto } from './dto/IAddAdministrator.dto';
import * as bcrypt from "bcrypt";
import { EditAdministratorValidator, IEditAdministratorDto } from './dto/IEditAdministrator.dto';
import IEditAdministrator from './dto/IEditAdministrator.dto';

class AdministratorController extends BaseController {

    getAll(req: Request, res: Response) {
        this.services.administrator.getAll({removePassword: true})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.administrator.getById(id, {removePassword: true})
            .then(result => {
                if(result === null){
                    return res.status(404).send("Administrator not found.");
                }
                
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }
    
    add(req: Request, res: Response) {
        const data = req.body as IAddAdministratorDto;

        if(!AddAdministratorValitator(data)){
            return res.status(400).send(AddAdministratorValitator.errors);
        }

        const passwordHash = bcrypt.hashSync(data.password, 10);

        this.services.administrator.add({
            username: data.username,
            password_hash: passwordHash
        })
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    editById(req: Request, res: Response) {
        const id: number = +req.params?.aid;
        const data = req.body as IEditAdministratorDto;

        if (!EditAdministratorValidator(data)) {
            return res.status(400).send(EditAdministratorValidator.errors);
        }

        const serviceData: IEditAdministrator = { };

        if (data.password !== undefined) {
            const passwordHash = bcrypt.hashSync(data.password, 10);
            serviceData.password_hash = passwordHash;
        }

        if (data.isActive !== undefined) {
            serviceData.is_active = data.isActive ? 1 : 0;
        }

        this.services.administrator.editById(id, serviceData)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }
}

export default AdministratorController;