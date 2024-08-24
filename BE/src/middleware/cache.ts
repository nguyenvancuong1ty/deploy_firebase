import { NextFunction, Request, Response } from 'express';

const { createClient } = require('redis');
import Product from '../models/model.product';
import { OK } from '../utils/response.success';

// const client = createClient({
//     password: 'F1ZhPJA8Vdjfm3ExJwKhAPIzRPLkGVQf',
//     socket: {
//         host: 'redis-17768.c299.asia-northeast1-1.gce.cloud.redislabs.com',
//         port: 17768,
//     },
// });
const client = createClient();
const cache = async (req: Request, res: Response, next: NextFunction) => {
    try {
        !client.isOpen && (await client.connect());
        const key = '__express__' + (req.originalUrl || req.url);
        const data = await client.get(key);
        if (data) {
            await client.disconnect();
            return new OK(JSON.parse(data)).send(res);
        } else {
            next();
        }
    } catch (error) {
        console.log('lỗi', error);
        client.isOpen && (await client.disconnect());
        next();
    }
};

const saveDataToCache = async (req: Request, data: Array<any> | any) => {
    if (Boolean(client.isOpen)) {
        await client.set('__express__' + (req.originalUrl || req.url), JSON.stringify(data));
        await client.disconnect();
    }
    return;
};

export { cache, client, saveDataToCache };