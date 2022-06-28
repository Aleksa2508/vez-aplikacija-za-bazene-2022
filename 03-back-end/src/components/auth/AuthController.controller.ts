import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { IAdministratorLoginDto } from './dto/IAdministratorLogin.dto';
import * as bcrypt from 'bcrypt';
import ITokenData from './dto/ITokenData';
import * as jwt from "jsonwebtoken"
import DevConfig from '../../configs';
import { IUserLoginDto } from './dto/IUserLogin.dto';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

export default class AuthController extends BaseController {
    
    async administratorLogin(req: Request, res: Response) {
        const data = req.body as IAdministratorLoginDto;

        this.services.administrator.getByUsername(data.username)
            .then(result => {
                if(result === null) {
                    throw{
                        status: 404,
                        message: "Administrator not found!"
                    };
                }
                return result;
            })
            .then(result => {
                if(!bcrypt.compareSync(data.password, result.passwordHash)) {
                    throw{
                        status: 404,
                        message: "Administrator not found!"
                    };
                }
                return result;
            })
            .then(result => {
                
                const tokenData: ITokenData = {
                    role: "administrator",
                    id: result.administratorId,
                    identity: result.username
                };

                const authToken = jwt.sign(tokenData, DevConfig.auth.administrator.tokens.auth.keys.private, {
                    algorithm: DevConfig.auth.administrator.algorithm,
                    issuer: DevConfig.auth.administrator.issuer,
                    expiresIn: DevConfig.auth.administrator.tokens.auth.duration
                });

                const refreshToken = jwt.sign(tokenData, DevConfig.auth.administrator.tokens.refresh.keys.private, {
                    algorithm: DevConfig.auth.administrator.algorithm,
                    issuer: DevConfig.auth.administrator.issuer,
                    expiresIn: DevConfig.auth.administrator.tokens.refresh.duration
                });

                res.send({
                    authToken: authToken,
                    refreshToken: refreshToken
                });

            })
            .catch(error => {
                setTimeout(() => {
                    res.status(error?.status ?? 500).send(error?.message);
                }, 1500);
            });
    }

    async administratorRefresh(req: Request, res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? "";

        try{
            const tokenData = AuthMiddleware.validateTokenAs(refreshTokenHeader, "administrator", "refresh");
            const authToken = jwt.sign(tokenData, DevConfig.auth.administrator.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.administrator.algorithm,
                issuer: DevConfig.auth.administrator.issuer,
                expiresIn: DevConfig.auth.administrator.tokens.auth.duration,
            });
    
            res.send({
                authToken: authToken,
            });
        }
        catch(error){
            res.status(error?.status ?? 500).send(error?.message);
        }

    }

    async userLogin(req: Request, res: Response) {
        const data = req.body as IUserLoginDto;

        this.services.user.getUserByEmail(data.email)
            .then(result => {
                if(result === null) {
                    throw{
                        status: 404,
                        message: "User not found!"
                    };
                }
                return result;
            })
            .then(result => {
                if(!bcrypt.compareSync(data.password, result.passwordHash)) {
                    throw{
                        status: 404,
                        message: "User not found!"
                    };
                }
                return result;
            })
            .then(result => {
                const tokenData: ITokenData = {
                    role: "user",
                    id: result.userId,
                    identity: result.email
                }
                const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                    algorithm: DevConfig.auth.user.algorithm,
                    issuer: DevConfig.auth.user.issuer,
                    expiresIn: DevConfig.auth.user.tokens.auth.duration
                
                });

                const refreshToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.refresh.keys.private, {
                    algorithm: DevConfig.auth.user.algorithm,
                    issuer: DevConfig.auth.user.issuer,
                    expiresIn: DevConfig.auth.user.tokens.refresh.duration
                });

                res.send({
                    authToken: authToken,
                    refreshToken: refreshToken,
                    id: result.userId
                });
            })
            .catch(error => {
                setTimeout(() => {
                    res.status(error?.status ?? 500).send(error?.message);
                }, 1500);
            });
    }

    async userRefresh(req: Request, res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? "";

        try {
            const tokenData = AuthMiddleware.validateTokenAs(refreshTokenHeader, "user", "refresh");
    
            const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.auth.duration,
            });
    
            res.send({
                authToken: authToken,
            });
        } catch (error) {
            res.status(error?.status ?? 500).send(error?.message);
        }
    }

}