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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
// const db = require("./firebase");
const helmet_1 = __importDefault(require("helmet"));
const route_product_1 = __importDefault(require("./src/routes/route.product"));
const route_account_1 = __importDefault(require("./src/routes/route.account"));
const route_cart_1 = __importDefault(require("./src/routes/route.cart"));
const route_order_1 = __importDefault(require("./src/routes/route.order"));
const path_1 = __importDefault(require("path"));
const route_notify_1 = __importDefault(require("./src/routes/route.notify"));
const cron_1 = require("cron"); // package lập lịch
const service_notify_1 = __importDefault(require("./src/service/service.notify"));
const service_product_1 = __importDefault(require("./src/service/service.product"));
const firebase_1 = require("./src/db/firebase");
const route_sale_1 = __importDefault(require("./src/routes/route.sale"));
const route_type_product_1 = __importDefault(require("./src/routes/route.type_product"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, helmet_1.default)());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({
    origin: [
        'https://deploy-firebase-fe.vercel.app',
        'https://incandescent-granita-f4f8a7.netlify.app',
        'https://cuongcodedao.id.vn',
        'https://cakebyme.shop',
        'http://localhost:3006',
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', route_account_1.default);
app.use('/', route_product_1.default);
app.use('/', route_cart_1.default);
app.use('/', route_order_1.default);
app.use('/', route_notify_1.default);
app.use('/', route_sale_1.default);
app.use('/', route_type_product_1.default);
app.set('views', path_1.default.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.get('/views', function (req, res) {
    res.render('index');
});
app.use((req, res, next) => {
    const error = new Error('Pages Not Found');
    req.statusCode = 404;
    next(error);
});
const job = new cron_1.CronJob('55 11 9 * * *', // cronTime
function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield service_product_1.default.getExpiredProducts(10);
        if (Array.isArray(data) && data.length > 0) {
            const expiredProduct = data.map((item) => {
                return `${item.name}[${item.id}]`;
            });
            const notify = {
                title: 'thông báo mặt hàng sắp hết hạn',
                body: `Sản phẩm ${expiredProduct.join(', ')} săp hết hạn, vui lòng kiểm tra kho hàng`,
            };
            const accountRef = firebase_1.db.collection('account');
            const querySnapshot = yield accountRef.where('type_account', '==', 'admin').get();
            const response = yield querySnapshot.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                yield firebase_1.db.collection('notify').add({
                    deleted: false,
                    description: notify.body,
                    icon: 'www',
                    isAll: false,
                    isRead: false,
                    link: 'string',
                    time: firebase_1.Timestamp.fromDate(new Date()),
                    title: notify.title,
                    user_id: [doc.id],
                });
                return doc.data().tokenNotify;
            }));
            const listTokenNotify = yield Promise.all(response);
            service_notify_1.default.sendNotifyToToken(listTokenNotify, notify);
        }
    });
}, // onTick
null, // onComplete
true, // start
'Asia/Ho_Chi_Minh');
app.use((error, req, res, next) => {
    const statusCode = req.statusCode || 500;
    console.log(error);
    res.status(statusCode).json({
        statusCode: statusCode,
        message: error.message,
    });
});
app.listen(port, () => {
    console.log(`Server running on port  ${port}`.toUpperCase());
});
