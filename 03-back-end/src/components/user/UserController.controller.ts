import { Request, Response } from "express";
import UserService from './UserService.service';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getAll(req: Request, res: Response) {
        this.userService.getAll({
            loadPeriods: true
        })
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    public async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.userService.getById(id, {
            loadPeriods: true
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }
}

export default UserController;