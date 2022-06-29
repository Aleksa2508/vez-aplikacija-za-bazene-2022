import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { IEditContactInfoDto } from './dto/IEditContactInfo.dto';

export default class ContactInfoController extends BaseController {
   
    getAll(req: Request, res: Response) {
        this.services.contactInfo.getAll({})
            .then(result => {
                res.send(result[0])
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    edit(req: Request, res: Response) {
        const id: number = 1;
        const data = req.body as IEditContactInfoDto;

        this.services.contactInfo.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.contactInfo.editById(id, data, {})
                    .then (async result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    });
                                   
            })
           
        }

}