import UserModel from './UserModel.model';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import PeriodService from '../period/PeriodService.service';
import IAddUser from './dto/IAddUser.dto';
import IEditUser from './dto/IEditUser.dto';
import { IPeriodUser } from '../period/PeriodModel.model';
import { DefaultPeriodAdapterOptions } from '../period/PeriodService.service';

interface IUserAdapterOptions extends IAdapterOptions {
    hidePassword: boolean;
    loadPeriods: boolean;
}

export const DefaultUserAdapterOptions: IUserAdapterOptions = {
    hidePassword: false,
    loadPeriods: false
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

        if (options.loadPeriods) {
            user.periods = await this.services.period.getAllByUserId(user.userId, DefaultPeriodAdapterOptions);
        }

        if (options.hidePassword) {
            user.passwordHash = null;
        }

        return user;
    }

    async add(data: IAddUser, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        return this.baseAdd(data, options);
    }

    async editById(id: number, data: IEditUser, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        return this.baseEditById(id, data, { hidePassword: true, loadPeriods: false });
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
                                    isActive: user.isActive
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
