declare class AdministratorModel {
    administratorId: number;
    username: string;
    passwordHash: string;
    created_at: Date;
    is_active: boolean;
}
export default AdministratorModel;
