import AdministratorModel from './AdministratorModel.model';
declare class AdministratorService {
    getAll(): Promise<AdministratorModel[]>;
    getById(administratorId: number): Promise<AdministratorModel | null>;
}
export default AdministratorService;
