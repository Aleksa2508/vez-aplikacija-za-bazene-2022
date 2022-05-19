"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AdministratorController {
    constructor(administratorService) {
        this.administratorService = administratorService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.administratorService.getAll());
        });
    }
    getById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
            const administrator = yield this.administratorService.getById(id);
            if (administrator === null) {
                return res.sendStatus(404);
            }
            res.send();
        });
    }
}
exports.default = AdministratorController;
//# sourceMappingURL=AdministratorController.controller.js.map