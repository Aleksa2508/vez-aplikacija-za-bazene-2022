import * as mysql2 from "mysql2/promise";
import AdministratorService from '../components/administrator/AdministratorService.service';
import UserService from '../components/user/UserService.service';
import PeriodService from '../components/period/PeriodService.service';
import ContactInfoService from "../components/contactInfo/ContactInfoService.service";
import WebsiteContentService from '../components/websiteContent/WebsiteContentService.service';

export interface IServices {
    administrator: AdministratorService;
    period: PeriodService;
    user: UserService;
    contactInfo: ContactInfoService;
    websiteContent: WebsiteContentService;
}
export default interface IApplicationResources {
    datebaseConnection: mysql2.Connection;
    services: IServices;
}

