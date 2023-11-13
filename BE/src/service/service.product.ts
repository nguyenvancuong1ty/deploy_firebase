import { Request, Response } from 'express';
import { Timestamp, db } from '../db/firebase';
import Product from '../models/model.product'; // Import your Product model
import axios from 'axios';
import SaleService from './service.sale';

class ProductService {
    static async getProductByType(type: string): Promise<Array<object>> {
        const productRef = db.collection('products');
        const querySnapshot = await productRef.where('deleted', '==', false).where('type', '==', type).get();

        // Sử dụng map để tạo ra một mảng các promises
        const promises = querySnapshot.docs.map(async (doc: any) => {
            const product: Product = { Id: doc.id, ...doc.data() };

            const sale: object | string = product.sale ? await SaleService.getSale(product.sale) : '';
            return { ...product, sale: sale };
        });

        // Sử dụng Promise.all để chờ tất cả các promises hoàn thành
        const response = await Promise.all(promises);

        return response;
    }

    static async getProductById(id: string): Promise<object> {
        const productRef = db.collection('products').doc(id);
        const doc = await productRef.get();
        let response: any = doc.data();
        console.log('ID', id, 'response', response);
        const sale: object | string = response.sale ? await SaleService.getSale(response.sale) : '';
        response = { ...response, sale: sale };
        return response;
    }

    static async getAllProduct(): Promise<Array<object>> {
        const productRef = db.collection('products');
        const querySnapshot = await productRef.where('deleted', '==', false).get();

        const data = querySnapshot.docs.map(async (doc: any) => {
            const product: Product = { Id: doc.id, ...doc.data() };
            const sale: object | string = product.sale ? await SaleService.getSale(product.sale) : '';
            return { ...product, sale: sale };
        });
        const response = Promise.all(data);
        return response;
    }

    static async addAProduct(req: Request, res: Response): Promise<Product> {
        const response = await db.collection('products').add({ ...req.body, timeCreate: Timestamp.fromDate(new Date()) });
        return response;
    }

    static async deleteProduct(req: Request): Promise<Array<Product>> {
        const { id } = req.params;
        const productRef = db.collection('products').doc(id);
        const response = await productRef.update({
            deleted: true,
            timeUpdate: Timestamp.fromDate(new Date()),
        });
        return response;
    }

    static async updateProduct(req: Request): Promise<object> {
        const { id } = req.params;
        const productRef = db.collection('products').doc(id);
        console.log(req.body);
        const response = await productRef.set({ ...req.body, timeCreate: Timestamp.fromDate(new Date()) });
        return response;
    }

    static async distance(req: Request, res: Response) {
        const apiKey = process.env.apiKey;
        const origin: string = req.query.origin as string;
        const destination: string = req.query.destination as string;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
        await axios
            .get(url)
            .then((response) => {
                res.header('Access-Control-Allow-Origin', '*');
                console.log(response.data);

                return res.json(response.data && response.data.rows[0].elements[0].distance.value);
            })
            .catch((e) => {
                res.status(500).json({ error: `Đã xảy ra lỗi ${e}` });
            });
    }

    static async getExpiredProducts(date: number): Promise<Array<object>> {
        const today = new Date();
        const dayLater = new Date(today);
        dayLater.setDate(today.getDate() + date);
        const productsRef = db.collection('products');
        const productData = await productsRef.where('expiryDate', '<=', dayLater).get();
        const response = productData.docs.map(async (doc: any) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        const data = await Promise.all(response);
        return data;
    }
}
export default ProductService;
