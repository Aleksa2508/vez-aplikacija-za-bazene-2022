import IModel from '../../common/IModel.interface';
class PeriodModel implements IModel {
    periodId: number;
    period: Date;
}

export default PeriodModel;