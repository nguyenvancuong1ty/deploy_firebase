import { db } from '../db/firebase';

class SaleService {
    static async getSale(id: string): Promise<object> {
        const saleRef = db.collection('Sale').doc(id);
        const doc = await saleRef.get();
        const response: object = { id: doc.id, ...doc.data() };
        return response;
    }

    static async getAllSale(): Promise<object> {
        const saleRef = db.collection('Sale');
        const docs = await saleRef.get();
        const response = await docs.docs.map((doc: any) => {
            return { id: doc.id, ...doc.data() };
        });
        return await Promise.all(response);
    }
}

export default SaleService;
