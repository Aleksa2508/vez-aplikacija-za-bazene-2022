import * as mysql2 from 'mysql2/promise';
import IModel from './IModel.interface';
import IAdapterOptions from './IAdapterOptions.interface';

export default abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private database: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection) {
        this.database = databaseConnection;
    }

    protected get db(): mysql2.Connection {
        return this.database;
    }

    abstract tableName(): string;
    protected abstract adaptToModel(data: any, options: IAdapterOptions): Promise<ReturnModel>;
    
    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        
        const tableName: string = this.tableName();
        
        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql: string = `SELECT * FROM \`${tableName}\``;
            this.db.execute(sql)
                .then(async ([rows]) => {

                    if (rows === undefined) {
                        return resolve([]);
                    }

                    const items: ReturnModel[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));
                    }

                    resolve(items);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    public getById(id: number, options: AdapterOptions): Promise<ReturnModel|null> {

        const tableName: string = this.tableName();

        return new Promise<ReturnModel>((resolve, reject) => {
            
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
    }

}