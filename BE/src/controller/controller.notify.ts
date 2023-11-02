import { Request, Response } from 'express';
import NotifyService from '../service/service.notify'; // Import your CartService
import { saveDataToCache } from '../middleware/cache';
import { OK } from '../utils/response.success';
import Notify from '../models/model.notify';

class NotifyController {
    async getNotifyOfUser(req: Request, res: Response): Promise<Response | any> {
        const data: Array<Notify> = await NotifyService.getNotifyOfUser(req, res);
        return new OK(data).send(res);
    }
    async getNotifyAllUser(req: Request, res: Response): Promise<Response | any> {
        const data: Array<Notify> = await NotifyService.getNotifyAllUser(req, res);
        return new OK(data).send(res);
    }
    async addNotifyOfUser(req: Request, res: Response): Promise<Response | any> {
        const data: Array<Notify> = await NotifyService.addNotifyOfUser(req, res);
        return new OK(data).send(res);
    }
    async updateNotify(req: Request, res: Response): Promise<Response | any> {
        const data: Array<Notify> = await NotifyService.updateNotify(req, res);
        return new OK(data).send(res);
    }
}

export default NotifyController;
