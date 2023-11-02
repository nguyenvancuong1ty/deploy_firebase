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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_notify_1 = __importDefault(require("../service/service.notify")); // Import your CartService
const response_success_1 = require("../utils/response.success");
class NotifyController {
    getNotifyOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_notify_1.default.getNotifyOfUser(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
    getNotifyAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_notify_1.default.getNotifyAllUser(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
    addNotifyOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_notify_1.default.addNotifyOfUser(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
    updateNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_notify_1.default.updateNotify(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
}
exports.default = NotifyController;
