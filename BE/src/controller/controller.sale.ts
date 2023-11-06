import { Request, Response } from 'express';
import SaleService from '../service/service.sale'; // Import your SaleService
import { client, saveDataToCache } from '../middleware/cache';
import { CREATED, OK } from '../utils/response.success';
// import Sale from '../models/model.card';
import { Conflict, INTERNAL_SERVER_ERROR } from '../utils/response.error';

class SaleController {
    async getAllSale(req: Request, res: Response): Promise<Response> {
        const data: any = await SaleService.getAllSale();
        saveDataToCache(req, data);
        return new OK(data).send(res);
    }
}

export default SaleController;
