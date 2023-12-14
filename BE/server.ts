import express from 'express';
import cors from 'cors';
require('dotenv').config();
// const db = require("./firebase");
import helmet from 'helmet';
import { NextFunction, Request, Response } from 'express';
import productRouter from './src/routes/route.product';
import accountRouter from './src/routes/route.account';
import cartRouter from './src/routes/route.cart';
import orderRouter from './src/routes/route.order';
import path from 'path';
import notifyRouter from './src/routes/route.notify';

import { CronJob } from 'cron'; // package lập lịch
import NotifyService from './src/service/service.notify';
import ProductService from './src/service/service.product';
import { Timestamp, db } from './src/db/firebase';
import saleRouter from './src/routes/route.sale';
import typeProductRouter from './src/routes/route.type_product';
const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(express.static('public'));

app.use(
    cors({
        origin: [
            'https://deploy-firebase-fe.vercel.app',
            'https://incandescent-granita-f4f8a7.netlify.app',
            'https://cuongcodedao.id.vn',
            'https://cakebyme.shop',
            'http://localhost:3006',
        ],
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', accountRouter);
app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', orderRouter);
app.use('/', notifyRouter);
app.use('/', saleRouter);
app.use('/', typeProductRouter);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.get('/views', function (req, res) {
    res.render('index');
});
app.use((req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error('Pages Not Found');
    req.statusCode = 404;
    next(error);
});

const job = new CronJob(
    '30 39 18 * * *', // cronTime
    async function () {
        const data = await ProductService.getExpiredProducts(10);
        if (Array.isArray(data) && data.length > 0) {
            const expiredProduct: any = data.map((item: any) => {
                return `${item.name}[${item.id}]`;
            });
            const notify = {
                title: 'thông báo mặt hàng sắp hết hạn',
                body: `Sản phẩm ${expiredProduct.join(', ')} săp hết hạn, vui lòng kiểm tra kho hàng`,
            };
            const accountRef = db.collection('account');
            const querySnapshot = await accountRef.where('type_account', '==', 'admin').get();
            const response = await querySnapshot.docs.map(async (doc: any) => {
                await db.collection('notify').add({
                    deleted: false,
                    description: notify.body,
                    icon: 'www',
                    isAll: false,
                    isRead: false,
                    link: 'string',
                    time: Timestamp.fromDate(new Date()),
                    title: notify.title,
                    user_id: [doc.id],
                });
                return doc.data().tokenNotify;
            });
            const listTokenNotify = await Promise.all(response);

            NotifyService.sendNotifyToToken(listTokenNotify, notify);
        }
    }, // onTick
    null, // onComplete
    true, // start
    'Asia/Ho_Chi_Minh', // timeZone
);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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
