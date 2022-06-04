import IModel from '../../common/IModel.interface';
import UserModel from '../user/UserModel.model';
class PeriodModel implements IModel {
    periodId: number;
    period: Date;

    users?: IPeriodUser[];
}

export interface IPeriodUser {
    user: UserModel;
    isCanceled: boolean;
}

export default PeriodModel;