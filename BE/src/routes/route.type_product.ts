const express = require('express');
const typeProductRouter = express.Router();
import { authentication } from '../middleware/authentication';
import { checkApiKey } from '../middleware/auth.Apikey';
import { cache } from '../middleware/cache';
import { handleError } from '../utils/response.error';
import { authorization } from '../middleware/authorization';
import TypeProductController from '../controller/controller.type_product';

const typeProductController = new TypeProductController();

//Middleware check permission

//routes
typeProductRouter.get('/type/product', handleError(typeProductController.getAllTypeProduct));
typeProductRouter.put('/type/product/:id', handleError(typeProductController.updateTypeProduct));
typeProductRouter.post('/type/product', authentication, authorization('admin'), handleError(typeProductController.addTypeProduct));
export default typeProductRouter;
