import UserModel from './UserModel.model';
class UserService {
    public async getAll(): Promise<UserModel[]> {
        const users: UserModel[] = [];

        return users;
    }

    public async getById(userId: number): Promise<UserModel|null> {
        
        if(userId === 5){
            return null;
        }

        return {
            userId: 1,
            email: "aleksa@gmail.com",
            passwordHash: "aleksa",
            firstName: "Aleksa",
            lastName: "Vidakovic",
            phoneNumber: "123456",
            createdAt: new Date(),
            isActive: true
        };
    }
}

export default UserService;