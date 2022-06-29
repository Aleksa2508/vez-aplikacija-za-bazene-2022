import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import ContactInfoController from './ContactInfoController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

export default class ContactInfoRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
       
        const contactInfoController: ContactInfoController = new ContactInfoController(resources.services);
        
        app.get("/api/contact-info", AuthMiddleware.getVerifier("administrator", "user"), contactInfoController.getAll.bind(contactInfoController));
        app.put("/api/contact-info", AuthMiddleware.getVerifier("administrator"), contactInfoController.edit.bind(contactInfoController));
        
    }
} 