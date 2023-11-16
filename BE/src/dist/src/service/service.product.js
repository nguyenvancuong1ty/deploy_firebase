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
const firebase_1 = require("../db/firebase");
const axios_1 = __importDefault(require("axios"));
const service_sale_1 = __importDefault(require("./service.sale"));
class ProductService {
    static getProductByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRef = firebase_1.db.collection('products');
            const querySnapshot = yield productRef.where('deleted', '==', false).where('type', '==', type).get();
            // Sử dụng map để tạo ra một mảng các promises
            const promises = querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const product = Object.assign({ Id: doc.id }, doc.data());
                const sale = product.sale ? yield service_sale_1.default.getSale(product.sale) : '';
                return Object.assign(Object.assign({}, product), { sale: sale });
            }));
            // Sử dụng Promise.all để chờ tất cả các promises hoàn thành
            const response = yield Promise.all(promises);
            return response;
        });
    }
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRef = firebase_1.db.collection('products').doc(id);
            const doc = yield productRef.get();
            let response = doc.data();
            console.log('ID', id, 'response', response);
            const sale = response.sale ? yield service_sale_1.default.getSale(response.sale) : '';
            response = Object.assign(Object.assign({}, response), { sale: sale });
            return response;
        });
    }
    static getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRef = firebase_1.db.collection('products');
            const querySnapshot = yield productRef.where('deleted', '==', false).get();
            const data = querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const product = Object.assign({ Id: doc.id }, doc.data());
                const sale = product.sale ? yield service_sale_1.default.getSale(product.sale) : '';
                return Object.assign(Object.assign({}, product), { sale: sale });
            }));
            const response = Promise.all(data);
            return response;
        });
    }
    static addAProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firebase_1.db.collection('products').add(Object.assign(Object.assign({}, req.body), { timeCreate: firebase_1.Timestamp.fromDate(new Date()) }));
            return response;
        });
    }
    static deleteProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productRef = firebase_1.db.collection('products').doc(id);
            const response = yield productRef.update({
                deleted: true,
                timeUpdate: firebase_1.Timestamp.fromDate(new Date()),
            });
            return response;
        });
    }
    static updateProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productRef = firebase_1.db.collection('products').doc(id);
            console.log(req.body);
            const response = yield productRef.update(Object.assign(Object.assign({}, req.body), { timeCreate: firebase_1.Timestamp.fromDate(new Date()) }));
            return response;
        });
    }
    static distance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.apiKey;
            const origin = req.query.origin;
            const destination = req.query.destination;
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
            yield axios_1.default
                .get(url)
                .then((response) => {
                res.header('Access-Control-Allow-Origin', '*');
                console.log(response.data);
                return res.json(response.data && response.data.rows[0].elements[0].distance.value);
            })
                .catch((e) => {
                res.status(500).json({ error: `Đã xảy ra lỗi ${e}` });
            });
        });
    }
    static getExpiredProducts(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const dayLater = new Date(today);
            dayLater.setDate(today.getDate() + date);
            const productsRef = firebase_1.db.collection('products');
            const productData = yield productsRef.where('expiryDate', '<=', dayLater).get();
            const response = productData.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                return Object.assign({ id: doc.id }, doc.data());
            }));
            const data = yield Promise.all(response);
            return data;
        });
    }
}
exports.default = ProductService;
