import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import ContactInfoModel from './ContactInfoModel.model';
import IEditContactInfo from './dto/IEditContactInfo.dto';

interface IContactInfoAdapterOptions extends IAdapterOptions {
   
}

export default class ContactInfoService extends BaseService<ContactInfoModel, IContactInfoAdapterOptions> {
    tableName(): string {
        return "contact_info";
    }

    protected async adaptToModel(data: any, options: IContactInfoAdapterOptions = {}): Promise<ContactInfoModel> {
        const contactInfo: ContactInfoModel = new ContactInfoModel();

        contactInfo.contactInfoId = +data?.contact_info_id;
        contactInfo.phone = data?.phone;
        contactInfo.email = data?.email;
        contactInfo.address = data?.address;

        return contactInfo;
    }

    

    async editById(id: number, data: IEditContactInfo, options: IContactInfoAdapterOptions = {}): Promise<ContactInfoModel> {
        return this.baseEditById(id, data, options);
    }

}

