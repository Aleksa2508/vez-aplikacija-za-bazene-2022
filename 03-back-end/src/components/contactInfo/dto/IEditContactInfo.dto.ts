import IServiceData from "../../../common/IServiceData.interface"


export default interface IEditContactInfo extends IServiceData {
    phone?: string;
    email?: string;
    address?: string;
}

export interface IEditContactInfoDto {
    phone?: string;
    email?: string;
    address?: string;
}
