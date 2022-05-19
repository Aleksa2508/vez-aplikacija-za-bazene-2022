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
class AdministratorService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const administrators = [];
            administrators.push({
                administratorId: 1,
                username: "admin1",
                passwordHash: "admin1",
                created_at: new Date(),
                is_active: true
            });
            administrators.push({
                administratorId: 2,
                username: "admin2",
                passwordHash: "admin2",
                created_at: new Date(),
                is_active: true
            });
            administrators.push({
                administratorId: 3,
                username: "admin3",
                passwordHash: "admin3",
                created_at: new Date(),
                is_active: true
            });
            return administrators;
        });
    }
    getById(administratorId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (administratorId === 5) {
                return null;
            }
            return {
                administratorId: administratorId,
                username: "admin4",
                passwordHash: "admin4",
                created_at: new Date(),
                is_active: true
            };
        });
    }
}
exports.default = AdministratorService;
//# sourceMappingURL=AdministratorService.service.js.map