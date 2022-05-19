class AdministratorModel {
    administratorId: number;
    username: string;
    passwordHash: string;
    createdAt: Date;
    isActive: boolean;
}

export default AdministratorModel;