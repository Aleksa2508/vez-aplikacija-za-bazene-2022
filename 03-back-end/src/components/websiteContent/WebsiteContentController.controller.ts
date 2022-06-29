import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { IEditWebsiteContentDto } from './dto/IEditWebsiteContent.dto';
import IEditWebsiteContent from './dto/IEditWebsiteContent.dto';


export default class WebsiteContentController extends BaseController {
   
    getAll(req: Request, res: Response) {
        this.services.websiteContent.getAll({})
            .then(result => {
                res.send(result[0])
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    edit(req: Request, res: Response) {
        const id: number = 1;
        const data = req.body as IEditWebsiteContentDto;

        const editData: IEditWebsiteContent = {};

        if(data.periodReservationGuide !== undefined) {
            editData.period_reservation_guide = data.periodReservationGuide;
        }

        if(data.swimmingPoolRules !== undefined) {
            editData.swimming_pool_rules = data.swimmingPoolRules;
        }

        this.services.websiteContent.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.websiteContent.editById(id, editData, {})
                    .then (async result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    });
                                   
            })
           
        }

}