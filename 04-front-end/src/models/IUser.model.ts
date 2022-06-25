import IPeriod from './IPeriod.model';
export default interface IUser {
    userId: number;
    email: string;
    passwordHash: string | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: string;
    isActive: boolean;
    activationCode: string | null;
    passwordResetCode: string | null;

    periods?: IUserPeriod[];
}

export interface IUserPeriod {
    period: IPeriod;
    isCanceled: boolean;
}