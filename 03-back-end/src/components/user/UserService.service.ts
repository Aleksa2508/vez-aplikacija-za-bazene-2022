import UserModel from './UserModel.model';
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import PeriodService from '../period/PeriodService.service';

interface IUserAdapterOptions extends IAdapterOptions {
    loadPeriods: boolean;
}

const DefaultUserAdapterOptions: IUserAdapterOptions = {
    loadPeriods: true
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
        user.isActive = data?.is_active;

        /*if (options.loadPeriods) {
            const periodService: PeriodService = new PeriodService(this.db);

            user.periods = await periodService.
        }*/

        return user;
    }

    public async getByEmail(email: string, options: IUserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel[]> {
        return this.getAllByFieldNameAnValue('email', email, options);
    }
    
}

export default UserService;
