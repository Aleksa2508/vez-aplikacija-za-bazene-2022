import PeriodModel from './PeriodModel.model';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';

interface IPeriodAdapterOptions extends IAdapterOptions {

}

const DefaultPeriodAdapterOptions: IPeriodAdapterOptions = {

}

class PeriodService extends BaseService<PeriodModel, IPeriodAdapterOptions> {
    tableName(): string {
        return "period";
    }

    protected async adaptToModel(data: any, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<PeriodModel> {
        const period: PeriodModel = new PeriodModel();

        period.periodId = +data?.period_id;
        period.period = data?.period;
        

        return period;
    }

    /*public getByUserId(userId: number, options: IPeriodAdapterOptions = DefaultPeriodAdapterOptions): Promise<PeriodModel|null> {

        const tableName: string = this.tableName();

        return new Promise<PeriodModel>((resolve, reject) => {
            
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE \`${tableName}_id\` = ?`;
            this.db.execute(sql, [id])
                .then(async([rows]) => {
                    
                    if(rows === undefined){
                        return resolve(null);
                    }

                    if(Array.isArray(rows) && rows.length === 0){
                        return resolve(null);
                    }

                    resolve(await this.adaptToModel(rows[0], options));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }*/
}

export default PeriodService;