import IRouter from '../../common/IRouter.interface';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import UserService from './UserService.service';
import UserController from './UserController.controller';
export default class UserRouter implements IRouter {
    public setupRoutes(app: express.Application, resources: IApplicationResources) {
        const userService: UserService = new UserService(resources.datebaseConnection);
        const userController: UserController = new UserController(userService);
        
        app.get("/api/user", userController.getAll.bind(userController));
        app.get("/api/user/:id", userController.getById.bind(userController));
        app.get("/api/users/:email", userController.getByEmail.bind(userController));
        //app.post("/api/user", userController.add.bind(userController));
    }
}