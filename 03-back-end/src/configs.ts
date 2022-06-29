import IConfig from './common/IConfig.interface';
import AdministratorRouter from './components/administrator/AdministratorRouter.router';
import UserRouter from './components/user/UserRouter.router';
import PeriodRouter from './components/period/PeriodRouter.router';
import { readFileSync } from 'fs';
import AuthRouter from './components/auth/AuthRouter.router';
import ContactInfoRouter from './components/contactInfo/ContactInfoRouter.router';
import WebsiteContentRouter from './components/websiteContent/WebsiteContentRouter.router';

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
        new PeriodRouter(),
        new AuthRouter(),
        new ContactInfoRouter(),
        new WebsiteContentRouter()
    ],
    mail: {
        host: "smtp.office365.com",
        port: 587,
        email: "",
        password: "",
        debug: true,
    },
    auth: {
        administrator: {
            algorithm: "RS256",
            issuer: "PIiVT",
            tokens: {
                auth: {
                    duration: 60 * 5, 
                    keys: {
                        public: readFileSync("./.keystore/admin.auth.public", "ascii"),
                        private: readFileSync("./.keystore/admin.auth.private", "ascii"),
                    },
                },
                refresh: {
                    duration: 60 * 60 * 24 * 30, 
                    keys: {
                        public: readFileSync("./.keystore/admin.refresh.public", "ascii"),
                        private: readFileSync("./.keystore/admin.refresh.private", "ascii"),
                    },
                },
            },
        },
        user: {
            algorithm: "RS256",
            issuer: "PIiVT",
            tokens: {
                auth: {
                    duration: 60 * 5, 
                    keys: {
                        public: readFileSync("./.keystore/user.auth.public", "ascii"),
                        private: readFileSync("./.keystore/user.auth.private", "ascii"),
                    },
                },
                refresh: {
                    duration: 60 * 60 * 24 * 30, 
                    keys: {
                        public: readFileSync("./.keystore/user.refresh.public", "ascii"),
                        private: readFileSync("./.keystore/user.refresh.private", "ascii"),
                    },
                },
            },
        },
        allowAllRoutesWithoutAuthTokens: false, // Samo dok traje razvoj front-end dela bez mogucnosti prijave
    },
};

export default DevConfig;