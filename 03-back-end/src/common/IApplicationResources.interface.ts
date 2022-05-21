import * as mysql2 from "mysql2/promise";

export default interface IApplicationResources {
    datebaseConnection: mysql2.Connection;
}