import { Request, Response } from 'express';
import { CREATED, OK } from '../utils/response.success';
import TypeProductService from '../service/service.type_product';

class TypeProductController {
    async getAllTypeProduct(req: Request, res: Response): Promise<Response> {
        const data: object = await TypeProductService.getAllTypeProduct();
        return new OK(data).send(res);
    }
    async updateTypeProduct(req: Request, res: Response): Promise<Response> {
        const data: object = await TypeProductService.updateTypeProduct(req);
        return new OK(data).send(res);
    }
    async addTypeProduct(req: Request, res: Response): Promise<Response> {
        const data = await TypeProductService.addTypeProduct(req, res);
        return new CREATED(data).send(res);
    }
}

export default TypeProductController;
