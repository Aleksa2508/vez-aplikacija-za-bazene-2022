import { Request, Response } from "express";
import BaseController from '../../common/BaseController';
import * as Mailer from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { RegisterUserValitator, IRegisterUserDto } from './dto/IRegisterUser.dto';
import * as bcrypt from 'bcrypt';
import { EditUserValitator, IEditUserDto } from './dto/IEditUser.dto';
import IEditUser from './dto/IEditUser.dto';
import * as uuid from "uuid";
import UserModel from './UserModel.model';
import DevConfig from '../../configs';
import { IPasswordResetDto, PasswordResetValidator } from './dto/IPasswordReset.dto';
import * as generatePassword from "generate-password";
class UserController extends BaseController {
    
    getAll(req: Request, res: Response) {
        this.services.user.getAll({hidePassword: true, loadPeriods: true, hideActivationCode: true})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        if(req.authorisation?.role === "user") {
            if(req.authorisation?.id !== id){
                return res.status(403).send("You do not have access to this resource!");
            }
        }

        this.services.user.getById(id, {hidePassword: true, loadPeriods: true, hideActivationCode: true})
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

    register(req: Request, res: Response) {
        const data = req.body as IRegisterUserDto;

        if(!RegisterUserValitator(data)){
            return res.status(400).send(RegisterUserValitator.errors);
        }

        const passwordHash = bcrypt.hashSync(data.password, 10);

        this.services.user.startTransaction()
            .then(() => {
                return this.services.user.add({
                    email: data.email,
                    password_hash: passwordHash,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone_number: data.phoneNumber,
                    activation_code: uuid.v4()
                });
            })
            .then(user => {
                return this.sendRegistrationEmail(user);
            })
            .then(async user => {
                await this.services.user.commitChanges();
                return user;
            })
            .then(user => {
                user.activationCode = null;
                res.send(user);
            })
            .catch(async error => {
                await this.services.user.rollbackChanges();
            });
            

    }

    edit(req: Request, res: Response) {
        const id: number = +req.params?.uid;
        const data = req.body as IEditUserDto;

        if(req.authorisation?.role === "user") {
            if(req.authorisation?.id !== id){
                return res.status(403).send("You do not have access to this resource!");
            }
        }

        if(!EditUserValitator(data)) {
            return res.status(400).send(EditUserValitator.errors);
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

    private getMailTransport() {
        return nodemailer.createTransport(
            {
                host: DevConfig.mail.host,
                port: DevConfig.mail.port,
                secure: false,
                tls: {
                    ciphers: "SSLv3",
                },
                debug: DevConfig.mail.debug,
                auth: {
                    user: DevConfig.mail.email,
                    pass: DevConfig.mail.password,
                },
            },
            {
                from: DevConfig.mail.email,
            },
        );
    }

    activate(req: Request, res: Response) {
        const code: string = req.params?.code;

        this.services.user.getUserByActivationCode(code, {
            hideActivationCode: true,
            hidePassword: true,
            loadPeriods: false
        })
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: "User not found!",
                }
            }

            return result;
        })
        .then(result => {
            const user = result as UserModel;

            return this.services.user.editById(user.userId, {
                is_active: 1,
                activation_code: null,
            });
        })
        .then(user => {
            return this.sendActivationEmail(user);
        })
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 500);
        });
    }

    private async sendRegistrationEmail(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            const transport = this.getMailTransport();
            console.log(transport);
            const mailOptions: Mailer.Options = {
                to: user.email,
                subject: "Account registration",
                html: `<!doctype html>
                        <html>
                            <head><meta charset="utf-8"></head>
                            <body>
                                <p>
                                    Dear ${ user.firstName } ${ user.lastName },<br>
                                    Your account was successfully created.
                                </p>
                                <p>
                                    You must activate you account by clicking on the following link:
                                </p>
                                <p style="text-align: center; padding: 10px;">
                                    <a href="http://localhost:10000/api/user/activate/${ user.activationCode }">Activate</a>
                                </p>
                            </body>
                        </html>`
            };
            
            transport.sendMail(mailOptions)
                .then(() => {
                    transport.close();

                    user.activationCode = null;

                    resolve(user);
                })
                .catch(error => {
                    transport.close();

                    reject({
                        message: error?.message,
                    });
                });
                console.log("zavrsio sam sendRegistrationFunkciju")
        });
        
    }
    
    private async sendActivationEmail(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            const transport = this.getMailTransport();

            const mailOptions: Mailer.Options = {
                to: user.email,
                subject: "Account activation",
                html: `<!doctype html>
                        <html>
                            <head><meta charset="utf-8"></head>
                            <body>
                                <p>
                                    Dear ${ user.firstName } ${ user.lastName },<br>
                                    Your account was successfully activated.
                                </p>
                                <p>
                                    You can now log into your account using the login form.
                                </p>
                            </body>
                        </html>`
            };

            transport.sendMail(mailOptions)
            .then(() => {
                transport.close();

                user.activationCode = null;
                user.passwordResetCode = null;

                resolve(user);
            })
            .catch(error => {
                transport.close();

                reject({
                    message: error?.message,
                });
            });
        });
    }

    passwordResetEmailSend(req: Request, res: Response) {
        const data = req.body as IPasswordResetDto;

        if (!PasswordResetValidator(data)) {
            return res.status(400).send(PasswordResetValidator.errors);
        }

        this.services.user.getUserByEmail(data.email, {
            hideActivationCode: false,
            hidePassword: true,
            loadPeriods: false
        })
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: "User not found!",
                }
            }

            return result;
        })
        .then(user => {
            if (!user.isActive && !user.activationCode) {
                throw {
                    status: 403,
                    message: "Your account has been deactivated by the administrator!",
                }
            }

            return user;
        })
        .then(user => {
            const code = uuid.v4() + "-" + uuid.v4();

            return this.services.user.editById(
                user.userId,
                {
                    password_reset_code: code,
                },
                {
                    hideActivationCode: true,
                    hidePassword: true,
                    loadPeriods: false
                },
            );
        })
        .then(user => {
            return this.sendRecoveryEmail(user);
        })
        .then(() => {
            res.send({
                message: "Sent"
            });
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 500);
        });
    }

    resetPassword(req: Request, res: Response) {
        const code: string = req.params?.code;

        this.services.user.getUserByPasswordResetCode(code, {
            hideActivationCode: false,
            hidePassword: true,
            loadPeriods: false
        })
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: "User not found!",
                }
            }

            return result;
        })
        .then(user => {
            if (!user.isActive && !user.activationCode) {
                throw {
                    status: 403,
                    message: "Your account has been deactivated by the administrator",
                };
            }

            return user;
        })
        .then(user => {
            const newPassword = generatePassword.generate({
                numbers: true,
                uppercase: true,
                lowercase: true,
                symbols: false,
                length: 18,
            });

            const passwordHash = bcrypt.hashSync(newPassword, 10);

            return new Promise<{user: UserModel, newPassword: string}>(resolve => {
                this.services.user.editById(
                    user.userId,
                    {
                        password_hash: passwordHash,
                        password_reset_code: null,
                    },
                    {
                        hideActivationCode: true,
                        hidePassword: true,
                        loadPeriods: false
                    }
                )
                .then(user => {
                    return this.sendNewPassword(user, newPassword);
                })
                .then(user => {
                    resolve({
                        user: user,
                        newPassword: newPassword,
                    });
                })
                .catch(error => {
                    throw error;
                });
            });
        })
        .then(() => {
            res.send({
                message: 'Sent!',
            });
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 500);
        });
    }

    private async sendNewPassword(user: UserModel, newPassword: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            const transport = this.getMailTransport();

            const mailOptions: Mailer.Options = {
                to: user.email,
                subject: "New password",
                html: `<!doctype html>
                        <html>
                            <head><meta charset="utf-8"></head>
                            <body>
                                <p>
                                    Dear ${ user.firstName } ${ user.lastName },<br>
                                    Your account password was successfully reset.
                                </p>
                                <p>
                                    Your new password is:<br>
                                    <pre style="padding: 20px; font-size: 24pt; color: #000; background-color: #eee; border: 1px solid #666;">${ newPassword }</pre>
                                </p>
                                <p>
                                    You can now log into your account using the login form.
                                </p>
                            </body>
                        </html>`
            };

            transport.sendMail(mailOptions)
            .then(() => {
                transport.close();

                user.activationCode = null;
                user.passwordResetCode = null;

                resolve(user);
            })
            .catch(error => {
                transport.close();

                reject({
                    message: error?.message,
                });
            });
        });
    }

    private async sendRecoveryEmail(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            const transport = this.getMailTransport();

            const mailOptions: Mailer.Options = {
                to: user.email,
                subject: "Account password reset code",
                html: `<!doctype html>
                        <html>
                            <head><meta charset="utf-8"></head>
                            <body>
                                <p>
                                    Dear ${ user.firstName } ${ user.lastName },<br>
                                    Here is a link you can use to reset your account:
                                </p>
                                <p>
                                    <a href="http://localhost:10000/api/user/reset/${ user.passwordResetCode }"
                                        sryle="display: inline-block; padding: 10px 20px; color: #fff; background-color: #db0002; text-decoration: none;">
                                        Click here to reset your account
                                    </a>
                                </p>
                            </body>
                        </html>`
            };

            transport.sendMail(mailOptions)
            .then(() => {
                transport.close();

                user.activationCode = null;
                user.passwordResetCode = null;

                resolve(user);
            })
            .catch(error => {
                transport.close();

                reject({
                    message: error?.message,
                });
            });
        });
    }
}

export default UserController;