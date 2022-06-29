import BaseService from '../../common/BaseService';
import WebsiteContentModel from './WebsiteContentModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IEditWebsiteContent from './dto/IEditWebsiteContent.dto';
interface IWebsiteContentAdapterOptions extends IAdapterOptions {
   
}

export default class WebsiteContentService extends BaseService<WebsiteContentModel, IWebsiteContentAdapterOptions> {
    tableName(): string {
        return "website_content";
    }

    protected async adaptToModel(data: any, options: IWebsiteContentAdapterOptions = {}): Promise<WebsiteContentModel> {
        const websiteContent: WebsiteContentModel = new WebsiteContentModel();

        websiteContent.websiteContentId = +data?.website_content_id;
        websiteContent.swimmingPoolRules = data?.swimming_pool_rules;
        websiteContent.periodReservationGuide = data?.period_reservation_guide;

        return websiteContent;
    }

    

    async editById(id: number, data: IEditWebsiteContent, options: IWebsiteContentAdapterOptions = {}): Promise<WebsiteContentModel> {
        return this.baseEditById(id, data, options);
    }

}