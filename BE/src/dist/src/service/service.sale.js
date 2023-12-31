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
const firebase_1 = require("../db/firebase");
class SaleService {
    static getSale(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleRef = firebase_1.db.collection('Sale').doc(id);
            const doc = yield saleRef.get();
            const response = Object.assign({ id: doc.id }, doc.data());
            return response;
        });
    }
    static getAllSale() {
        return __awaiter(this, void 0, void 0, function* () {
            const saleRef = firebase_1.db.collection('Sale');
            const docs = yield saleRef.get();
            const response = yield docs.docs.map((doc) => {
                return Object.assign({ id: doc.id }, doc.data());
            });
            return yield Promise.all(response);
        });
    }
}
exports.default = SaleService;
