import IModel from "../../common/IModel.interface";

export default class ContactInfoModel implements IModel {
    contactInfoId: number;
    phone: string;
    email: string;
    address: string;
}