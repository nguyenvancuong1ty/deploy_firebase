import { Request, Response } from 'express';
import ProductService from '../service/service.product'; // Import your ProductService
import { client, saveDataToCache } from '../middleware/cache';
import { CREATED, OK } from '../utils/response.success';
import Product from '../models/model.product';

class ProductController {
    async getProduct(req: Request, res: Response): Promise<Response> {
        const data: Array<any> = await ProductService.getProductByType(req.query.type as string);
        saveDataToCache(req, data);
        return new OK(data).send(res);
    }
    async getProductById(req: Request, res: Response): Promise<Response> {
        const data: object = await ProductService.getProductById(req.params.id as string);
        return new OK(data).send(res);
    }
    async getAllProduct(req: Request, res: Response): Promise<Response> {
        const data: object = await ProductService.getAllProduct();
        saveDataToCache(req, data);
        return new OK(data).send(res);
    }

    async addProduct(req: Request, res: Response): Promise<Response> {
        const data = await ProductService.addAProduct(req, res);

        return new CREATED(data).send(res);
    }

    async deleteProduct(req: Request, res: Response): Promise<Response> {
        const data = await ProductService.deleteProduct(req);
        return new OK(data, 'delete OK').send(res);
    }

    async updateProduct(req: Request, res: Response): Promise<Response> {
        const data = await ProductService.updateProduct(req);
        return new OK(data, 'update OK').send(res);
    }

    async distance(req: Request, res: Response): Promise<void> {
        await ProductService.distance(req, res);
    }
}

export default ProductController;
