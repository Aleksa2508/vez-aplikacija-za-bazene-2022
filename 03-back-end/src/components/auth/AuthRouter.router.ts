import { Application } from 'express';
import IApplicationResourcesInterface from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthController from './AuthController.controller';
export default class AuthRouter implements IRouter {
    setupRoutes(app: Application, resources: IApplicationResourcesInterface) {
        const authController: AuthController = new AuthController(resources.services);
        
        app.post("/api/auth/administrator/login", authController.administratorLogin.bind(authController));
        app.post("/api/auth/administrator/refresh", authController.administratorRefresh.bind(authController));
        app.post("/api/auth/user/login", authController.userLogin.bind(authController));
        app.post("/api/auth/user/refresh", authController.userRefresh.bind(authController));
    }
}