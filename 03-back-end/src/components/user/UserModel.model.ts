import IModel from '../../common/IModel.interface';
import PeriodModel from '../period/PeriodModel.model';
class UserModel implements IModel {
    userId: number;
    email: string;
    passwordHash: string | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: string;
    isActive: boolean;
    activationCode: string | null;
    passwordResetCode: string | null;

    periods?: IUserPeriod[];
}

export interface IUserPeriod {
    period: PeriodModel;
    isCanceled: boolean;
}

export default UserModel;