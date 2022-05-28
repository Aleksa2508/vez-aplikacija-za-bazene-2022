import IModel from '../../common/IModel.interface';
import PeriodModel from '../period/PeriodModel.model';
class UserModel implements IModel {
    userId: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: string;
    isActive: boolean;

    periods?: IUserPeriod[];
}

export interface IUserPeriod {
    period: PeriodModel;
    isCanceled: boolean;
}

export default UserModel;