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
const service_account_1 = __importDefault(require("../service/service.account"));
const response_success_1 = require("../utils/response.success");
const response_error_1 = require("../utils/response.error");
const firebase_1 = require("../db/firebase");
class AccountController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.login(req, res);
            if (data) {
                return new response_success_1.OK(data).send(res);
            }
            else {
                return new response_error_1.UnAuthorized('Incorrect username or password').send(res);
            }
        });
    }
    handleLoginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.handleLoginWithGoogle(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
    handleLoginWithGithub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.handleLoginWithGithub(req, res);
            return new response_success_1.OK(data).send(res);
        });
    }
    getAllAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.getAllAccount(req, res);
            if (data) {
                return new response_success_1.OK(data).send(res);
            }
            return;
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.create(req, res);
            if (data.Id) {
                return new response_success_1.CREATED(data).send(res);
            }
            return;
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.changePassword(req, res);
            if (data) {
                return new response_success_1.OK(data, 'change password success').send(res);
            }
            else {
                return new response_error_1.Conflict('Incorrect password').send(res);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.update(req, res);
            return new response_success_1.OK(data, 'update success').send(res);
        });
    }
    confirmCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.confirmCode(req, res);
            if (data) {
                return new response_success_1.OK(data, 'get code success, pleas check you email').send(res);
            }
            else {
                return new response_error_1.Conflict('Email does not exist').send(res);
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service_account_1.default.forgetPassword(req, res);
            if (data) {
                return new response_success_1.OK().send(res);
            }
            else {
                return new response_error_1.Conflict('Incorrect code').send(res);
            }
        });
    }
    registerNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newToken = req.body.token;
            yield firebase_1.messaging
                .subscribeToTopic(newToken, process.env.TOPIC)
                .then(() => {
                console.log('Successfully subscribed to topic:', process.env.TOPIC);
            })
                .catch((e) => {
                console.log('Error subscribing to topic:', e);
            });
            return new response_success_1.OK().send(res);
        });
    }
    unsubscribeFromTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listTopic = [];
            yield firebase_1.messaging
                .unsubscribeFromTopic([
                'dzs_-q9xvavV3ZvPwD6ZWe:APA91bELGR7DKUK-xUYK1fSF3Adzbpe5s4joDC9nI7GCIRljYqrSZPfqpj8cqrAYhmxk8g1Ckk8gltEcviSGjitIOrHFK-O1cg1UG7hiwEkqnSH2UFylRN_Hf32AXV-UeyHMCKA6KnNv',
            ], process.env.TOPIC)
                .then(() => {
                console.log('Successfully subscribed to topi:', process.env.TOPIC);
            })
                .catch((e) => {
                console.log('Error subscribing to topic:', e);
            });
            return new response_success_1.OK().send(res);
        });
    }
    notifyAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const message = {
                data: {
                    title: title,
                    body: body,
                },
                topic: process.env.TOPIC,
            };
            const messageSend = yield firebase_1.messaging.send(message);
            const notifyQuery = firebase_1.db.collection('notify');
            const querySnapshot = yield notifyQuery.add({
                deleted: false,
                description: body,
                icon: 'www',
                isAll: true,
                isRead: false,
                link: 'string',
                time: firebase_1.Timestamp.fromDate(new Date()),
                title: title,
                user_id: [],
            });
            yield Promise.all([messageSend, querySnapshot])
                .then(() => {
                return new response_success_1.OK([], 'send notify success').send(res);
            })
                .catch(() => {
                return false;
            });
        });
    }
}
exports.default = AccountController;
