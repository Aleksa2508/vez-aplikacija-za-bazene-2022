import IServiceData from "../../../common/IServiceData.interface"


export default interface IEditWebsiteContent extends IServiceData {
    swimming_pool_rules?: string;
    period_reservation_guide?: string;
}

export interface IEditWebsiteContentDto {
    swimmingPoolRules?: string;
    periodReservationGuide?: string;
}
