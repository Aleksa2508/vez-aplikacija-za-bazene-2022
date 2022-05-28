import { Request, Response } from "express";
import BaseController from '../../common/BaseController';
import { DefaultUserAdapterOptions } from './UserService.service';
import { AddUserValitator, IAddUserDto } from './dto/IAddUser.dto';
import * as bcrypt from 'bcrypt';
import { EditUserValitator, IEditUserDto } from './dto/IEditUser.dto';
import IEditUser from './dto/IEditUser.dto';

class UserController extends BaseController {
    
    getAll(req: Request, res: Response) {
        this.services.user.getAll({hidePassword: true, loadPeriods: true})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.user.getById(id, {hidePassword: true, loadPeriods: true})
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

    add(req: Request, res: Response) {
        const data = req.body as IAddUserDto;

        if(!AddUserValitator){
            return res.status(400).send(AddUserValitator.errors);
        }

        const passwordHash = bcrypt.hashSync(data.password, 10);

        this.services.user.add({
            email: data.email,
            password_hash: passwordHash,
            first_name: data.firstName,
            last_name: data.lastName,
            phone_number: data.phoneNumber
        })
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }

    edit(req: Request, res: Response) {
        const id: number = +req.params?.uid;
        const data = req.body as IEditUserDto;

        if(!EditUserValitator) {
            return res.status(400).send(AddUserValitator.errors);
        }

        const editData: IEditUser = {};

        if(data.firstName !== undefined) {
            editData.first_name = data.firstName;
        }

        if(data.lastName !== undefined) {
            editData.last_name = data.lastName;
        }

        if(data.phoneNumber !== undefined) {
            editData.phone_number = data.phoneNumber;
        }

        if (data.password !== undefined) {
            const passwordHash = bcrypt.hashSync(data.password, 10);
            editData.password_hash = passwordHash;
        }

        if (data.isActive !== undefined) {
            editData.is_active = data.isActive ? 1 : 0;
        }

        this.services.user.editById(id, editData)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }
}

export default UserController;