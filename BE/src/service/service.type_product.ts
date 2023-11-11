import { Request, Response } from 'express';
import { Timestamp, db } from '../db/firebase';
import Product from '../models/model.product'; // Import your Product model
import axios from 'axios';

class TypeProductService {
    static async getAllTypeProduct(): Promise<Array<object>> {
        const typeProductRef = db.collection('type_product');
        const querySnapshot = await typeProductRef.where('deleted', '==', false).get();
        const data = querySnapshot.docs.map(async (doc: any) => {
            const type_product: object = { Id: doc.id, ...doc.data() };
            return { ...type_product };
        });
        const response = await Promise.all(data);
        return response;
    }

    static async addTypeProduct(req: Request, res: Response): Promise<Product> {
        const response = await db.collection('products').add({ ...req.body, timeCreate: Timestamp.fromDate(new Date()) });
        return response;
    }
}
export default TypeProductService;
