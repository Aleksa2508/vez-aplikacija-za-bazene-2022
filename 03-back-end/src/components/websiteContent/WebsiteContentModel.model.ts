import IModel from "../../common/IModel.interface";

export default class WebsiteContentModel implements IModel {
    websiteContentId: number
    swimmingPoolRules: string;
    periodReservationGuide: string;
}