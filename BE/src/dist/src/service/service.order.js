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
const authorization_1 = require("../middleware/authorization");
const areObjectsEqual_1 = require("../utils/areObjectsEqual");
class OrderService {
    static getAllOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.query;
            const orderRef = firebase_1.db.collection('order');
            const querySnapshot = type ? yield orderRef.where('status', '==', type).get() : yield orderRef.where('deleted', '==', false).get();
            const response = querySnapshot.docs.map((item) => {
                return Object.assign(Object.assign({}, item.data()), { Id: item.id });
            });
            const data = yield Promise.all(response);
            return data;
        });
    }
    static getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, type } = req.query;
            const orderRef = firebase_1.db.collection('order');
            const querySnapshot = yield orderRef.where('deleted', '==', false).where('id_user_shipper', '==', id).where('status', '==', type).get();
            const response = [];
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productWithDocId = Object.assign({ Id: doc.id }, product);
                response.push(productWithDocId);
            });
            return response;
        });
    }
    static getNewOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsRef = firebase_1.db.collection('order');
            const querySnapshot = yield productsRef.where('status', '==', 'pending').where('deleted', '==', false).get();
            const response = [];
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productWithDocId = Object.assign({ Id: doc.id }, product);
                response.push(productWithDocId);
            });
            return response;
        });
    }
    static addOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, shipping_address, detail, weight, shipping_cost, total_amount, phoneNumber } = req.body;
            const newOrder = {
                deleted: false,
                detail: detail,
                user_order: uid,
                total_amount: total_amount * 1,
                shipping_address: shipping_address,
                status: 'pending',
                weight: weight,
                phoneNumber: phoneNumber,
                id_user_shipper: '',
                shipping_cost: shipping_cost * 1,
                order_date: firebase_1.Timestamp.fromDate(new Date()),
                start_shipping_date: {},
                shipped_date: {},
            };
            const response = yield firebase_1.db.collection('order').add(newOrder);
            return response;
        });
    }
    static getOrderForCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const productsRef = firebase_1.db.collection('order');
            const querySnapshot = yield productsRef.where('deleted', '==', false).where('user_order', '==', id).get();
            const response = [];
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productWithDocId = Object.assign({ Id: doc.id }, product);
                response.push(productWithDocId);
            });
            return response;
        });
    }
    static deleteShallowOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const docRef = firebase_1.db.collection('order').doc(id);
            yield docRef.update({
                deleted: true,
                timeUpdate: firebase_1.Timestamp.fromDate(new Date()),
            });
        });
    }
    static updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id_user_shipper, status } = req.query;
            const docRef = firebase_1.db.collection('order').doc(id);
            const docSnap = yield docRef.get();
            const data = docSnap.data();
            if (status === 'shipping') {
                if ((0, authorization_1.authorization)(['admin', 'shipper'])) {
                    if (data.status === 'shipping') {
                        return false;
                    }
                    else {
                        yield docRef.update({
                            id_user_shipper,
                            status,
                            start_shipping_date: firebase_1.Timestamp.fromDate(new Date()),
                        });
                        return true;
                    }
                }
            }
            else if (status === 'shipped') {
                const productRef = firebase_1.db.collection('products').doc(req.body.product_id);
                const productSnap = yield productRef.get();
                const product = productSnap.data();
                if (JSON.stringify(req.body.modifier) === '{}') {
                    yield productRef.update({
                        quantity: product.quantity * 1 - req.body.quantity,
                        sold: product.sold * 1 + req.body.quantity,
                    });
                }
                else {
                    if (Array.isArray(product.attribute)) {
                        console.log('vô');
                        const attributeOk = product.attribute.filter((item) => {
                            return !(0, areObjectsEqual_1.areObjectsEqual)(item, req.body.modifier);
                        });
                        const attributeNotOk = product.attribute.find((item) => {
                            return (0, areObjectsEqual_1.areObjectsEqual)(item, req.body.modifier);
                        });
                        yield productRef.update({
                            quantity: product.quantity * 1 - req.body.quantity,
                            sold: product.sold * 1 + req.body.quantity,
                            attribute: [...attributeOk, Object.assign(Object.assign({}, attributeNotOk), { quantity: attributeNotOk.quantity * 1 - req.body.quantity })],
                        });
                    }
                }
                yield docRef.update({
                    status,
                    shipped_date: firebase_1.Timestamp.fromDate(new Date()),
                });
                return true;
            }
            else if (status === 'pending') {
                yield docRef.update({
                    id_user_shipper: '',
                    status,
                    start_shipping_date: '',
                });
                return true;
            }
        });
    }
    static notifyForOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.status === 'shipping') {
                const message = {
                    data: {
                        title: 'Giao hàng',
                        body: `Đơn hàng ${req.body.id} đã có người nhận giao...`,
                        icon: 'https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/ba.png',
                    },
                    token: req.body.token,
                    webpush: {
                        headers: {
                            TTL: '86400',
                        },
                        fcmOptions: {
                            link: 'https://www.facebook.com/profile.php?id=100093651007165',
                        },
                    },
                };
                const messageSend = yield firebase_1.messaging.send(message);
                const notifyQuery = firebase_1.db.collection('notify');
                const querySnapshot = yield notifyQuery.add({
                    deleted: false,
                    description: `Đơn hàng ${req.body.id} đã có người nhận giao...`,
                    icon: 'www',
                    isAll: false,
                    isRead: false,
                    link: 'string',
                    time: firebase_1.Timestamp.fromDate(new Date()),
                    title: 'Giao hàng',
                    user_id: [req.body.user_order_id],
                });
                yield Promise.all([messageSend, querySnapshot])
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
                return true;
            }
            else if (req.body.status === 'pending') {
                const message = {
                    data: {
                        title: 'Hủy hàng',
                        body: `shipper đã hủy giao đơn hàng ${req.body.id}`,
                    },
                    token: req.body.token,
                    webpush: {
                        headers: {
                            TTL: '86400',
                        },
                    },
                };
                const messageSend = yield firebase_1.messaging.send(message);
                const notifyQuery = firebase_1.db.collection('notify');
                const querySnapshot = yield notifyQuery.add({
                    deleted: false,
                    description: `shipper đã hủy giao đơn hàng ${req.body.id}`,
                    icon: 'www',
                    isAll: false,
                    isRead: false,
                    link: 'string',
                    time: firebase_1.Timestamp.fromDate(new Date()),
                    title: 'Hủy hàng',
                    user_id: [req.body.user_order_id],
                });
                yield Promise.all([messageSend, querySnapshot])
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
                return true;
            }
            else {
                const message = {
                    data: {
                        title: 'Nhận hàng',
                        body: `Đơn hàng  ${req.body.id} sắp đến hãy chuẩn bị nhận.`,
                    },
                    token: req.body.token,
                    webpush: {
                        headers: {
                            TTL: '86400',
                        },
                    },
                };
                const messageSend = yield firebase_1.messaging.send(message);
                const notifyQuery = firebase_1.db.collection('notify');
                const querySnapshot = yield notifyQuery.add({
                    deleted: false,
                    description: `Đơn hàng  ${req.body.id} sắp đến hãy chuẩn bị nhận.`,
                    icon: 'www',
                    isAll: false,
                    isRead: false,
                    link: 'string',
                    time: firebase_1.Timestamp.fromDate(new Date()),
                    title: 'Nhận hàng',
                    user_id: [req.body.user_order_id],
                });
                yield Promise.all([messageSend, querySnapshot])
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
                return true;
            }
        });
    }
}
exports.default = OrderService;
