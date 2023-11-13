import { Request, Response } from 'express';
import { Timestamp, db } from '../db/firebase';
import Product from '../models/model.product'; // Import your Product model
import Cart from '../models/model.card';
import ProductService from './service.product';

const a = Timestamp.fromDate(new Date());

class CartService {
    static async getCartByUser(req: Request, res: Response): Promise<Array<Cart>> {
        const { uid } = req.params;
        const cartQuery = db.collection('cart');
        const querySnapshot = await cartQuery.where('uid', '==', uid).where('deleted', '==', false).get();
        const response: Array<any> = [];

        await Promise.all(
            querySnapshot.docs.map(async (doc2: any) => {
                const cartItem: Cart = doc2.data();
                const productDoc: any = await ProductService.getProductById(cartItem.cakeID);
                response.push({ ...cartItem, product: { ...productDoc }, id: doc2.id });
            }),
        );
        return response;
    }

    static async addToCart(req: Request, res: Response): Promise<any> {
        const { uid, cakeID, quantity, modifier } = req.body;
        const querySnapshot = await db
            .collection('cart')
            .where('cakeID', '==', cakeID)
            .where('uid', '==', uid)
            .where('deleted', '==', false)
            .where('modifier', '==', modifier)
            .get();
        const response: Array<any> = querySnapshot.docs.map((doc: any) => {
            return { id: doc.id, ...doc.data() };
        });

        if (response.length > 0) {
            await db
                .collection('cart')
                .doc(response[0].id)
                .update({ quantity: quantity, createdDate: Timestamp.fromDate(new Date()) });
            return {
                result: false,
                oldQuantity: response[0].quantity,
            };
        } else {
            await db.collection('cart').add({
                uid,
                cakeID,
                quantity: quantity || 1,
                deleted: false,
                modifier: modifier,
                createdDate: Timestamp.fromDate(new Date()),
            });
            return {
                result: true,
            };
        }
    }

    static async updateCart(req: Request): Promise<Array<Cart>> {
        const { quantity } = req.body;
        const { id } = req.params;
        const docRef = db.collection('cart').doc(id);
        const response = await docRef.update({
            quantity: quantity * 1,
            timeUpdate: Timestamp.fromDate(new Date()),
        });
        return response;
    }

    static async deleteCart(req: Request): Promise<Array<Cart>> {
        const { id } = req.params;
        const docRef = db.collection('cart').doc(id);
        const response = await docRef.update({
            deleted: true,
            timeUpdate: Timestamp.fromDate(new Date()),
        });
        return response;
    }
}

export default CartService;
