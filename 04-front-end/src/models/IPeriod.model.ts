import IUser from "./IUser.model";

export default interface IPeriod {
    periodId: number;
    period: Date;
    users?: IPeriodUser[];
    emptySpots: number;
}

export interface IPeriodUser {
    user: IUser;
    isCanceled: boolean;
}