import IConfig from './common/IConfig.interface';
import AdministratorRouter from './components/administrator/AdministratorRouter.router';
import UserRouter from './components/user/UserRouter.router';
import PeriodRouter from './components/period/PeriodRouter.router';

const DevConfig: IConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24,
            route: "/assets",
            path: "./static"
        }
    },
    logging: {
        path: "./logs",
        filename: "access.log",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms"
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "piivt_projekat",
        charset: "utf8",
        timezone: "+01:00",
    },
    routers: [
        new AdministratorRouter(),
        new UserRouter(),
        new PeriodRouter()
    ]
};

export default DevConfig;