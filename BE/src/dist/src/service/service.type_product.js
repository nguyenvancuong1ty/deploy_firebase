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
class TypeProductService {
    static getAllTypeProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const typeProductRef = firebase_1.db.collection('type_product');
            const querySnapshot = yield typeProductRef.where('deleted', '==', false).get();
            const data = querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const type_product = Object.assign({ Id: doc.id }, doc.data());
                return Object.assign({}, type_product);
            }));
            const response = yield Promise.all(data);
            return response;
        });
    }
    static updateTypeProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const typeRef = firebase_1.db.collection('type_product').doc(id);
            const response = yield typeRef.update(Object.assign({}, req.body));
            return response;
        });
    }
    static addTypeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firebase_1.db.collection('type_product').add(Object.assign(Object.assign({}, req.body), { deleted: false }));
            return response;
        });
    }
}
exports.default = TypeProductService;
