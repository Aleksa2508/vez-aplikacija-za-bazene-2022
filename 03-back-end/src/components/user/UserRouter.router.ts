import IRouter from '../../common/IRouter.interface';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';

import UserController from './UserController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
export default class UserRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        
        const userController: UserController = new UserController(resources.services);
        
        app.get("/api/user", AuthMiddleware.getVerifier("administrator"), userController.getAll.bind(userController));
        app.get("/api/user/:id", AuthMiddleware.getVerifier("administrator", "user"), userController.getById.bind(userController));
        app.post("/api/user/register", userController.register.bind(userController));
        app.put("/api/user/:uid", AuthMiddleware.getVerifier("administrator", "user"), userController.edit.bind(userController));
        app.get("/api/user/activate/:code", userController.activate.bind(userController));
        app.post("/api/user/resetPassword",  userController.passwordResetEmailSend.bind(userController));
        app.get("/api/user/reset/:code", userController.resetPassword.bind(userController));
        
    }
}