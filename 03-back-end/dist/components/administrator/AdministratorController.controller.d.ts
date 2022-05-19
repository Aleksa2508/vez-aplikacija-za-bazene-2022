import { Request, Response } from "express";
import AdministratorService from './AdministratorService.service';
declare class AdministratorController {
    private administratorService;
    constructor(administratorService: AdministratorService);
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default AdministratorController;
