import {Request, Response} from "express";
import UserService from './UserService.service';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getAll(req: Request, res: Response) {
        res.send(await this.userService.getAll());
    }

    public async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        const user = await this.userService.getById(id);

        if(user === null){
            return res.sendStatus(404);
        }

        res.send(user);
    }
}

export default UserController;