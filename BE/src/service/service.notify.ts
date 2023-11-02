import { Request, Response, response } from 'express';
import { Timestamp, db, messaging } from '../db/firebase';
import Notify from '../models/model.notify';
const a = Timestamp.fromDate(new Date());

class NotifyService {
    static async getNotifyOfUser(req: Request, res: Response): Promise<Array<Notify>> {
        const { uid } = req.params;

        const notifyQuery = db.collection('notify');
        const querySnapshot = await notifyQuery.where('user_id', '==', uid).where('deleted', '==', false).get();
        const response: Array<any> = [];
        await Promise.all(
            querySnapshot.docs.map(async (doc2: any) => {
                const notifyItem: Notify = doc2.data();
                response.push({ ...notifyItem, id: doc2.id });
            }),
        );
        return response;
    }
    static async getNotifyAllUser(req: Request, res: Response): Promise<Array<Notify>> {
        const notifyQuery = db.collection('notify');
        const querySnapshot = await notifyQuery.where('isAll', '==', true).where('deleted', '==', false).get();
        const response: Array<any> = [];
        await Promise.all(
            querySnapshot.docs.map(async (doc2: any) => {
                const notifyItem: Notify = doc2.data();
                response.push({ ...notifyItem, id: doc2.id });
            }),
        );
        return response;
    }
    static async addNotifyOfUser(req: Request, res: Response): Promise<any> {
        const { uid } = req.params || req.body;
        const notifyQuery = db.collection('notify');
        const querySnapshot = await notifyQuery.add({});
        return querySnapshot.data();
    }

    static async updateNotify(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const notifyRef = db.collection('notify').doc(id);
        const response = await notifyRef.update({ ...req.body });
        return response;
    }

    static async sendNotifyToToken(token: Array<string>, notify: any) {
        const message: object = {
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

        await messaging.sendMulticast(message);
    }
}
export default NotifyService;
