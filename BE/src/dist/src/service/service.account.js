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
const response_error_1 = require("../utils/response.error");
const path_1 = __importDefault(require("path"));
// import { getAccessToken } from '../utils/auth2.0';
const mail_define_1 = require("../utils/mail.define");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const ejs = require('ejs');
const readFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, fileData) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(fileData);
                }
            });
        });
        return data;
    }
    catch (err) {
        return '';
    }
});
class AccountService {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const querySnapshot = yield firebase_1.db.collection('account').where('username', '==', email).get();
            const data = [];
            querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const account = Object.assign({ Id: doc.id }, doc.data());
                data.push(account);
            }));
            if (Array.isArray(data) && data.length > 0 && bcrypt.compareSync(password, data[0].password)) {
                const accessToken = jwt.sign({ email: email, role: data[0].type_account }, process.env.SECRET, {
                    expiresIn: '3d',
                });
                const refreshToken = jwt.sign({ email: email, role: data[0].type_account }, process.env.SECRET, {
                    expiresIn: '7d',
                });
                res.cookie('refreshToken', refreshToken);
                res.cookie('auth', JSON.stringify(data[0]));
                return {
                    data: data[0],
                    accessToken: accessToken,
                };
            }
            else {
                return false;
            }
        });
    }
    static handleLoginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, email, displayName } = req.body;
            const data = {
                active: false,
                address: '',
                age: 18,
                deleted: false,
                username: email,
                password: bcrypt.hashSync(uid + email, 8),
                type_account: 'customer',
                fullName: displayName,
                salary: 0,
                timeCreate: firebase_1.Timestamp.fromDate(new Date()),
            };
            const accountRef = firebase_1.db.collection('account').doc(uid);
            const doc = yield accountRef.get();
            let accessToken = '';
            let refreshToken = '';
            if (!doc.exists) {
                yield firebase_1.db.collection('account').doc(uid).set(data);
                accessToken = jwt.sign({ email: email, role: data.type_account }, process.env.SECRET, {
                    expiresIn: '2d',
                });
                refreshToken = jwt.sign({ email: email, role: data.type_account }, process.env.SECRET, {
                    expiresIn: '7d',
                });
            }
            else {
                accessToken = jwt.sign({ email: email, role: doc.data().type_account }, process.env.SECRET, {
                    expiresIn: '2d',
                });
                refreshToken = jwt.sign({ email: email, role: doc.data().type_account }, process.env.SECRET, {
                    expiresIn: '7d',
                });
            }
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            return { accessToken: accessToken, data: doc.data() };
        });
    }
    static getAllAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountRef = firebase_1.db.collection('account');
            const querySnapshot = yield accountRef.get();
            const response = querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const account = Object.assign({ Id: doc.id }, doc.data());
                return Object.assign({}, account);
            }));
            const data = yield Promise.all(response);
            return data;
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, displayName, password, confirmCode, confirm_password } = req.body;
            const code = yield firebase_1.db.collection('codeConfirm').where('email', '==', email).get();
            if (confirm_password !== password) {
                return new response_error_1.Conflict('Incorrect confirm password vs password').send(res);
            }
            else if (!code.docs[0] || confirmCode * 1 !== code.docs[0].data().code) {
                return new response_error_1.Conflict('Incorrect code or expired code.').send(res);
            }
            else {
                const querySnapshot = yield firebase_1.db.collection('account').where('username', '==', email).get();
                if (querySnapshot.docs[0]) {
                    return new response_error_1.Conflict('Account already exist').send(res);
                }
                else {
                    const newAccount = {
                        active: false,
                        address: '',
                        age: 0,
                        deleted: false,
                        fullName: displayName || '',
                        password: bcrypt.hashSync(password, 8),
                        salary: 0,
                        timeCreate: firebase_1.Timestamp.fromDate(new Date()),
                        type_account: 'customer',
                        username: email,
                    };
                    const response = yield firebase_1.db.collection('account').add(newAccount);
                    if (response.id) {
                        const accessToken = jwt.sign({ email: email, role: newAccount.type_account }, process.env.SECRET, {
                            expiresIn: '2d',
                        });
                        const refreshToken = jwt.sign({ email: email, role: newAccount.type_account }, process.env.SECRET, {
                            expiresIn: '7d',
                        });
                        res.cookie('refreshToken', refreshToken, { httpOnly: true });
                        return Object.assign(Object.assign({ Id: response.id }, newAccount), { accessToken: accessToken });
                    }
                    return new response_error_1.INTERNAL_SERVER_ERROR('Account already exist').send(res);
                }
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield firebase_1.db.collection('account').doc(id).update(req.body);
            return { Id: response.id };
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, newPassword } = req.body;
            const { id } = req.params;
            const querySnapshot = yield firebase_1.db.collection('account').doc(id).get();
            if (querySnapshot.data() && bcrypt.compareSync(password, querySnapshot.data().password)) {
                const response = yield firebase_1.db
                    .collection('account')
                    .doc(id)
                    .update({ password: bcrypt.hashSync(newPassword, 8) });
                return response;
            }
            else {
                return false;
            }
        });
    }
    static confirmCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = yield (0, mail_define_1.mailDefine)();
            const code = Math.floor((Math.random() + 1) * 10000);
            try {
                yield firebase_1.db.runTransaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const oldCode = yield transaction.get(firebase_1.db.collection('codeConfirm').where('email', '==', req.params.email));
                    let docId = '';
                    if (oldCode.docs[0]) {
                        docId = oldCode.docs[0].id;
                        yield transaction.update(firebase_1.db.collection('codeConfirm').doc(oldCode.docs[0].id), {
                            email: req.params.email,
                            code: code,
                        });
                    }
                    else {
                        const newData = yield firebase_1.db.collection('codeConfirm').doc();
                        docId = newData.id;
                        yield transaction.set(newData, {
                            email: req.params.email,
                            code: code,
                        });
                    }
                    const html = yield readFile(path_1.default.join(path_1.default.resolve(process.cwd()), 'public/index.ejs'));
                    const renderedHtml = ejs.render(html, { code: code });
                    yield transporter.sendMail({
                        from: 'Email thank you',
                        to: [req.params.email],
                        subject: 'Hello ✔ 😊😊😊',
                        text: 'Thank you 😁😁😁',
                        html: renderedHtml, // html body
                    });
                    setTimeout(() => {
                        firebase_1.db.collection('codeConfirm').doc(docId).delete();
                    }, 60000);
                }));
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    static forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { confirm } = req.body;
            const code = yield firebase_1.db.collection('codeConfirm').where('email', '==', req.params.email).get();
            if (confirm * 1 === code.docs[0].data().code) {
                const transporter = yield (0, mail_define_1.mailDefine)();
                const newPass = './;;adsfjiwefawed';
                yield transporter
                    .sendMail({
                    from: 'Email thank you',
                    to: req.params.email,
                    subject: `Hello ${req.params.email}✔ `,
                    text: 'Thank you',
                    html: `<h1>new password : -------   ${newPass}   ---------</h1>`, // html body
                })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    const account = yield firebase_1.db.collection('account').where('email', '==', req.params.email).get();
                    account &&
                        (yield firebase_1.db
                            .collection('account')
                            .doc(account.docs[0].id)
                            .update({ password: bcrypt.hashSync(newPass, 8) }));
                }));
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = AccountService;
