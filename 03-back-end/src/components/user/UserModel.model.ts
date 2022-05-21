import IModel from '../../common/IModel.interface';
import PeriodModel from '../period/PeriodModel.model';
class UserModel implements IModel {
    userId: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: Date;
    isActive: boolean;

    periods?: PeriodModel[];
}

export default UserModel;