import * as express from "express";
import * as cors from "cors";
import IConfig from './config/IConfig.interface';
import DevConfig from './config/configs';
import AdministratorController from './components/administrator/AdministratorController.controller';
import AdministratorService from './components/administrator/AdministratorService.service';
import * as fs from "fs";
import * as morgan from "morgan";

const config: IConfig = DevConfig;

fs.mkdirSync("./logs", {
    mode: 0o755,
    recursive: true,
});

const app: express.Application = express();
app.use(cors());
app.use(express.json());

app.use(morgan(":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms" , {
    stream: fs.createWriteStream("./logs/access.log")
}));

app.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
}));

const administratorService: AdministratorService = new AdministratorService();
const administratorController: AdministratorController = new AdministratorController(administratorService);
app.get("/api/administrator", administratorController.getAll.bind(administratorController));
app.get("/api/administrator/:id", administratorController.getById.bind(administratorController));

app.use((req, res) => {
    res.sendStatus(404)
});

app.listen(config.server.port);