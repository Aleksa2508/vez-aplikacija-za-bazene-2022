import IConfig from './IConfig.interface';

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
    }
};

export default DevConfig;