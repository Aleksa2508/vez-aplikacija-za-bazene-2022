import * as mysql2 from "mysql2/promise";
import AdministratorService from '../components/administrator/AdministratorService.service';
import UserService from '../components/user/UserService.service';
import PeriodService from '../components/period/PeriodService.service';

export interface IServices {
    administrator: AdministratorService;
    period: PeriodService;
    user: UserService;
}
export default interface IApplicationResources {
    datebaseConnection: mysql2.Connection;
    services: IServices;
}

