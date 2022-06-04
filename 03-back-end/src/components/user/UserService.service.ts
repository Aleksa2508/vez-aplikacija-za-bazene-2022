import UserModel from './UserModel.model';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IEditUser from './dto/IEditUser.dto';
import { IPeriodUser } from '../period/PeriodModel.model';
import { DefaultPeriodAdapterOptions } from '../period/PeriodService.service';
import IAddUser from './dto/IRegisterUser.dto';

interface IUserAdapterOptions extends IAdapterOptions {
    hidePassword: boolean;
    loadPeriods: boolean;
    hideActivationCode: boolean;
}

export const DefaultUserAdapterOptions: IUserAdapterOptions = {
    hidePassword: false,
    loadPeriods: false,
    hideActivationCode: false
}
class UserService extends BaseService<UserModel, IUserAdapterOptions> {

    tableName(): string {
        return "user";
    }

    protected async adaptToModel(data: any, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        const user: UserModel = new UserModel();

        user.userId = +data?.user_id;
        user.email = data?.email;
        user.passwordHash = data?.password_hash;
        user.firstName = data?.first_name;
        user.lastName = data?.last_name;
        user.phoneNumber = data?.phone_number;
        user.createdAt = data?.created_at;
        user.isActive = data?.is_active === 1;
        user.activationCode = data?.activation_code ? data?.activation_code : null;
        user.passwordResetCode = data?.password_reset_code ? data?.password_reset_code : null;

        if (options.loadPeriods) {
            user.periods = await this.services.period.getAllByUserId(user.userId, DefaultPeriodAdapterOptions);
        }

        if (options.hidePassword) {
            user.passwordHash = null;
        }

        if(options.hideActivationCode) {
            user.activationCode = null;
        }

        return user;
    }

    async add(data: IAddUser, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        return this.baseAdd(data, options);
    }

    async editById(id: number, data: IEditUser, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        return this.baseEditById(id, data, { hidePassword: true, loadPeriods: false, hideActivationCode: true});
    }

    async getUserByActivationCode(activationCode: string, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAnValue("activation_code", activationCode, options)
                .then(result => {
                    
                    if(result.length === 0) {
                        resolve(null);
                    }

                    resolve(result[0]);

                })
                .catch(error => {
                    reject(error?.message);
                });
        });
    }

    async getUserByPasswordResetCode(passwordResetCode: string, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAnValue("password_reset_code", passwordResetCode, options)
                .then(result => {
                    
                    if(result.length === 0) {
                        resolve(null);
                    }

                    resolve(result[0]);

                })
                .catch(error => {
                    reject(error?.message);
                });
        });
    }

    async getUserByEmail(email: string, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAnValue("email", email, options)
                .then(result => {
                    
                    if(result.length === 0) {
                        resolve(null);
                    }

                    resolve(result[0]);

                })
                .catch(error => {
                    reject(error?.message);
                });
        });
    }

    async getAllByPeriodId(periodId: number, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<IPeriodUser[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<{
                period_size_id: number,
                period_id: number,
                user_id: number,
                is_canceled: number
            }>("period_user", "period_id", periodId)
                .then(async result => {
                    if (result.length === 0) {
                        return resolve([]);
                    }

                    const periods: IPeriodUser[] = await Promise.all(
                        result.map(async row => {
                            // Dok nemamo cache
                            const user = await (await this.getById(row.user_id, DefaultUserAdapterOptions));

                            return {
                                user: {
                                    userId: row.user_id,
                                    email: user.email,
                                    passwordHash: user.passwordHash,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    phoneNumber: user.phoneNumber,
                                    createdAt: user.createdAt,
                                    isActive: user.isActive,
                                    activationCode: user.activationCode,
                                    passwordResetCode: user.passwordResetCode
                                },

                                isCanceled: row.is_canceled === 1,
                            }
                        })
                    );

                    resolve(periods);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }
    
}
export default UserService;
