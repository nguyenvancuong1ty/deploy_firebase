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

    static async updateTypeProduct(req: Request): Promise<Product> {
        const { id } = req.params;
        const typeRef = db.collection('type_product').doc(id);
        const response = await typeRef.update({ ...req.body });
        return response;
    }

    static async addTypeProduct(req: Request, res: Response): Promise<Product> {
        const response = await db.collection('type_product').add({ ...req.body, deleted: false });

        return response;
    }
}
export default TypeProductService;
