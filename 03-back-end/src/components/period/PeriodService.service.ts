import PeriodModel from './PeriodModel.model';

class PeriodService {
    public async getAll(): Promise<PeriodModel[]> {
        const periods: PeriodModel[] = [];
        
        return periods;
    }
    public async getById(periodId: number): Promise<PeriodModel|null> {
        if (periodId === 5) {
            return null;
        }

        return {
            periodId: periodId,
            period: new Date()
        }
    }
}

export default PeriodService;