import AdministratorModel from './AdministratorModel.model';

class AdministratorService {
    public async getAll(): Promise<AdministratorModel[]> {
        const administrators: AdministratorModel[] = [];

        administrators.push({
            administratorId: 1,
            username: "admin1",
            passwordHash: "admin1",
            createdAt: new Date(),
            isActive: true
        });

        administrators.push({
            administratorId: 2,
            username: "admin2",
            passwordHash: "admin2",
            createdAt: new Date(),
            isActive: true
        });

        administrators.push({
            administratorId: 3,
            username: "admin3",
            passwordHash: "admin3",
            createdAt: new Date(),
            isActive: true
        });
        
        return administrators;
    }

    public async getById(administratorId: number): Promise<AdministratorModel|null> {

        if (administratorId === 5) {
            return null;
        }

        return {
            administratorId: administratorId,
            username: "admin4",
            passwordHash: "admin4",
            createdAt: new Date(),
            isActive: true
        }
    }
}

export default AdministratorService;