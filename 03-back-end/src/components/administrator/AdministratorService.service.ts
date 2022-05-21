import AdministratorModel from './AdministratorModel.model';
import * as mysql2 from "mysql2/promise";
import IAddAdministrator from './dto/IAddAdministrator.dto';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';

interface IAdministratorAdapterOptions extends IAdapterOptions {

}

const DefaultAdministratorAdapterOptions: IAdministratorAdapterOptions = {

}

class AdministratorService extends BaseService<AdministratorModel, IAdministratorAdapterOptions> {

    tableName(): string {
        return "administrator";
    }
    
    protected async adaptToModel(data: any, options: IAdministratorAdapterOptions = DefaultAdministratorAdapterOptions): Promise<AdministratorModel> {
        const administrator: AdministratorModel = new AdministratorModel();

        administrator.administratorId = +data?.administrator_id;
        administrator.username = data?.username;
        administrator.passwordHash = data?.password_hash;
        administrator.createdAt = data?.created_at;
        administrator.isActive = data?.is_active;

        return administrator;
    }

    public async add(data: IAddAdministrator): Promise<AdministratorModel> {
        return new Promise<AdministratorModel>((resolve, reject) => {
            const sql: string = "INSERT `administrator` SET `username`=?, `password_hash`=?;";
            this.db.execute(sql, [data.username, data.passwordHash])
                .then(async result => {
                    const info: any = result;

                    const newAdministratorId = +(info[0]?.insertId);

                    const newAdministrator: AdministratorModel|null = await this.getById(newAdministratorId, DefaultAdministratorAdapterOptions);
                    
                    if(newAdministrator === null){
                        return reject({message: "Duplicate administrator username"});
                    }

                    resolve(newAdministrator);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default AdministratorService;