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
const service_product_1 = __importDefault(require("./service.product"));
const a = firebase_1.Timestamp.fromDate(new Date());
class CartService {
    static getCartByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const cartQuery = firebase_1.db.collection('cart');
            const querySnapshot = yield cartQuery.where('uid', '==', uid).where('deleted', '==', false).get();
            const response = [];
            yield Promise.all(querySnapshot.docs.map((doc2) => __awaiter(this, void 0, void 0, function* () {
                const cartItem = doc2.data();
                const productDoc = yield service_product_1.default.getProductById(cartItem.cakeID);
                response.push(Object.assign(Object.assign({}, cartItem), { product: Object.assign({}, productDoc), id: doc2.id }));
            })));
            return response;
        });
    }
    static addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, cakeID, quantity, modifier } = req.body;
            const querySnapshot = yield firebase_1.db
                .collection('cart')
                .where('cakeID', '==', cakeID)
                .where('uid', '==', uid)
                .where('deleted', '==', false)
                .where('modifier', '==', modifier)
                .get();
            const response = querySnapshot.docs.map((doc) => {
                return Object.assign({ id: doc.id }, doc.data());
            });
            if (response.length > 0) {
                yield firebase_1.db
                    .collection('cart')
                    .doc(response[0].id)
                    .update({ quantity: quantity, createdDate: firebase_1.Timestamp.fromDate(new Date()) });
                return {
                    result: false,
                    oldQuantity: response[0].quantity,
                };
            }
            else {
                yield firebase_1.db.collection('cart').add({
                    uid,
                    cakeID,
                    quantity: quantity || 1,
                    deleted: false,
                    modifier: modifier,
                    createdDate: firebase_1.Timestamp.fromDate(new Date()),
                });
                return {
                    result: true,
                };
            }
        });
    }
    static updateCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity } = req.body;
            const { id } = req.params;
            const docRef = firebase_1.db.collection('cart').doc(id);
            const response = yield docRef.update({
                quantity: quantity * 1,
                timeUpdate: firebase_1.Timestamp.fromDate(new Date()),
            });
            return response;
        });
    }
    static deleteCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const docRef = firebase_1.db.collection('cart').doc(id);
            const response = yield docRef.update({
                deleted: true,
                timeUpdate: firebase_1.Timestamp.fromDate(new Date()),
            });
            return response;
        });
    }
}
exports.default = CartService;
