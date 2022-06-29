import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import WebsiteContentController from './WebsiteContentController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';


export default class WebsiteContentRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
       
        const websiteContentController: WebsiteContentController = new WebsiteContentController(resources.services);
        
        app.get("/api/website-content", /*AuthMiddleware.getVerifier("administrator", "user"),*/ websiteContentController.getAll.bind(websiteContentController));
        app.put("/api/website-content", /*AuthMiddleware.getVerifier("administrator"),*/ websiteContentController.edit.bind(websiteContentController));
        
    }
} 