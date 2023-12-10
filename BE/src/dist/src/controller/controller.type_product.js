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
const response_success_1 = require("../utils/response.success");
const service_type_product_1 = __importDefault(require("../service/service.type_product"));
class TypeProductController {
    getAllTypeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_type_product_1.default.getAllTypeProduct();
            return new response_success_1.OK(data).send(res);
        });
    }
    updateTypeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_type_product_1.default.updateTypeProduct(req);
            return new response_success_1.OK(data).send(res);
        });
    }
    addTypeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_type_product_1.default.addTypeProduct(req, res);
            return new response_success_1.CREATED(data).send(res);
        });
    }
}
exports.default = TypeProductController;
