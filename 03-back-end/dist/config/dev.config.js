"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DevConfig = {
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
exports.default = DevConfig;
//# sourceMappingURL=dev.config.js.map