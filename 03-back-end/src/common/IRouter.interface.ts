import * as express from 'express';
import IApplicationResources from './IApplicationResources.interface';
export default interface IRouter {
    setupRoutes(app: express.Application, resources: IApplicationResources);
}