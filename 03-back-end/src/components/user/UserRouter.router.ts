import IRouter from '../../common/IRouter.interface';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';

import UserController from './UserController.controller';
export default class UserRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        
        const userController: UserController = new UserController(resources.services);
        
        app.get("/api/user", userController.getAll.bind(userController));
        app.get("/api/user/:id", userController.getById.bind(userController));
        app.post("/api/user", userController.add.bind(userController));
        app.put("/api/user/:uid", userController.edit.bind(userController));
    }
}