const express = require('express');
const productRouter = express.Router();
import { authentication } from '../middleware/authentication';
import { checkApiKey } from '../middleware/auth.Apikey';
import { cache } from '../middleware/cache';
import { handleError } from '../utils/response.error';
import ProductController from '../controller/controller.product';
import { authorization } from '../middleware/authorization';

const productController = new ProductController();

//Middleware check permission

//routes
productRouter.get('/product', handleError(productController.getProduct));
productRouter.get('/product/search', handleError(productController.getAllProduct));
productRouter.get('/product/distance', handleError(productController.distance));
productRouter.get('/product/:id', handleError(productController.getProductById));
productRouter.post('/product', authentication, authorization('admin'), handleError(productController.addProduct));
productRouter.patch('/product/delete/:id', authentication, handleError(productController.deleteProduct));
productRouter.put('/product/:id', authorization('admin'), handleError(productController.updateProduct));

export default productRouter;
