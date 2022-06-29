import * as express from "express";
import * as cors from "cors";
import IConfig from './common/IConfig.interface';
import DevConfig from './configs';
import * as fs from "fs";
import * as morgan from "morgan";
import IApplicationResources from "./common/IApplicationResources.interface";
import * as mysql2 from 'mysql2/promise';
import AdministratorService from './components/administrator/AdministratorService.service';
import PeriodService from './components/period/PeriodService.service';
import UserService from './components/user/UserService.service';
import ContactInfoService from "./components/contactInfo/ContactInfoService.service";
import WebsiteContentService from './components/websiteContent/WebsiteContentService.service';

async function main() {
    const config: IConfig = DevConfig;

    fs.mkdirSync(config.logging.path, {
        mode: 0o755,
        recursive: true,
    });

    const db =  await mysql2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone,
    });

    const applicationResources: IApplicationResources = {
        datebaseConnection: db,
        services: {
            administrator: null,
            period: null,
            user: null,
            contactInfo: null,
            websiteContent: null
        }
    }

    applicationResources.services.administrator = new AdministratorService(applicationResources);
    applicationResources.services.period = new PeriodService(applicationResources);
    applicationResources.services.user = new UserService(applicationResources);
    applicationResources.services.contactInfo = new ContactInfoService(applicationResources);
    applicationResources.services.websiteContent = new WebsiteContentService(applicationResources);

    const app: express.Application = express();
    app.use(cors());
    app.use(express.json());

    app.use(morgan(config.logging.format, {
        stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, { flags: "a" })
    }));

    app.use(config.server.static.route, express.static(config.server.static.path, {
        index: config.server.static.index,
        dotfiles: config.server.static.dotfiles,
        cacheControl: config.server.static.cacheControl,
        etag: config.server.static.etag,
        maxAge: config.server.static.maxAge
    }));

    for(const router of config.routers){
        router.setupRoutes(app, applicationResources);
    } 

    app.use((req, res) => {
        res.sendStatus(404)
    });

    app.listen(config.server.port);
}

process.on("uncaughtException", error => {
    console.error("ERROR: ", error);
});

main();

