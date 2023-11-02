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
const a = firebase_1.Timestamp.fromDate(new Date());
class NotifyService {
    static getNotifyOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const notifyQuery = firebase_1.db.collection('notify');
            const querySnapshot = yield notifyQuery.where('user_id', '==', uid).where('deleted', '==', false).get();
            const response = [];
            yield Promise.all(querySnapshot.docs.map((doc2) => __awaiter(this, void 0, void 0, function* () {
                const notifyItem = doc2.data();
                response.push(Object.assign(Object.assign({}, notifyItem), { id: doc2.id }));
            })));
            return response;
        });
    }
    static getNotifyAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifyQuery = firebase_1.db.collection('notify');
            const querySnapshot = yield notifyQuery.where('isAll', '==', true).where('deleted', '==', false).get();
            const response = [];
            yield Promise.all(querySnapshot.docs.map((doc2) => __awaiter(this, void 0, void 0, function* () {
                const notifyItem = doc2.data();
                response.push(Object.assign(Object.assign({}, notifyItem), { id: doc2.id }));
            })));
            return response;
        });
    }
    static addNotifyOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params || req.body;
            const notifyQuery = firebase_1.db.collection('notify');
            const querySnapshot = yield notifyQuery.add({});
            return querySnapshot.data();
        });
    }
    static updateNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const notifyRef = firebase_1.db.collection('notify').doc(id);
            const response = yield notifyRef.update(Object.assign({}, req.body));
            return response;
        });
    }
    static sendNotifyToToken(token, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                data: {
                    title: notify.title,
                    body: notify.body,
                },
                tokens: token,
                webpush: {
                    headers: {
                        TTL: '86400',
                    },
                },
            };
            yield firebase_1.messaging.sendMulticast(message);
        });
    }
}
exports.default = NotifyService;
