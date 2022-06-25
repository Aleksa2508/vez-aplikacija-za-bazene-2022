import PeriodModel from './PeriodModel.model';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddPeriod, { IPeriodUser } from './dto/IAddPeriod.dto';
import IEditPeriod from './dto/IEditPeriod.dto';
import { timeStamp } from 'console';
import { DefaultUserAdapterOptions } from '../user/UserService.service';

import { IUserPeriod } from '../user/UserModel.model';

interface IPeriodAdapterOptions extends IAdapterOptions {
    loadUsers: boolean;
}

export const DefaultPeriodAdapterOptions: IPeriodAdapterOptions = {
    loadUsers: false
}

class PeriodService extends BaseService<PeriodModel, IPeriodAdapterOptions> {
    tableName(): string {
        return "period";
    }

    protected async adaptToModel(data: any, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<PeriodModel> {
        const period: PeriodModel = new PeriodModel();

        period.periodId = +data?.period_id;
        period.period = data?.period;

        /*if(options.loadUsers){
            period.users = await this.services.user.getAllByPeriodId(period.periodId, DefaultUserAdapterOptions);
        }*/
        period.users = await this.services.user.getAllByPeriodId(period.periodId, DefaultUserAdapterOptions);
        period.emptySpots = 10 - period.users.length;

        if(!options.loadUsers) {
            period.users = null;
        }


        return period;
    }

    async add(data: IAddPeriod, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<PeriodModel> {
        return this.baseAdd(data, options);
    }

    async editById(id: number, data: IEditPeriod, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<PeriodModel> {
        return this.baseEditById(id, data, options);
    }

    public getAllByUserId(userId: number, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<IUserPeriod[]> {

        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<{
                period_size_id: number,
                period_id: number,
                user_id: number,
                is_canceled: number
            }>("period_user", "user_id", userId)
                .then(async result => {
                    if (result.length === 0) {
                        return resolve([]);
                    }

                    const users: IUserPeriod[] = await Promise.all(
                        result.map(async row => {
                            // Dok nemamo cache
                            const period = await (await this.getById(row.period_id, DefaultPeriodAdapterOptions));

                            return {
                                period: {
                                    periodId: row.period_id,
                                    period: period.period,
                                    emptySpots: period.emptySpots
                                },

                                isCanceled: row.is_canceled === 1,
                            }
                        })
                    );

                    resolve(users);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async addPeriodUser(data: IPeriodUser): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT period_user SET period_id = ?, user_id = ?;";

            this.db.execute(sql, [ data.period_id, data.user_id])
                .then(async result => {
                    const info: any = result;
                    resolve(+(info[0]?.insertId));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async cancelPeriodUser(data: IPeriodUser): Promise<true> {
        return new Promise((resolve, reject) => {
            const sql: string = "UPDATE period_user SET is_canceled = 1 WHERE period_id = ? AND user_id = ?;";

            this.db.execute(sql, [ /*data.is_canceled,*/ data.period_id, data.user_id])
                .then(result => {
                    const info: any = result;

                    if (+info[0]?.affectedRows === 1) {
                        return resolve(true);
                    }

                    throw {
                        status: 500,
                        message: "Could not edit this period user record!",
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

export default PeriodService;