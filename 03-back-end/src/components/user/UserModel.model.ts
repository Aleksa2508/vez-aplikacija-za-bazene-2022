class UserModel {
    userId: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: Date;
    isActive: boolean;
}

export default UserModel;