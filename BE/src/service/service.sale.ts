import { db } from '../db/firebase';

class SaleService {
    static async getSale(id: string): Promise<object> {
        const saleRef = db.collection('Sale').doc(id);
        const doc = await saleRef.get();
        const response: object = doc.data();
        return response;
    }
}

export default SaleService;
