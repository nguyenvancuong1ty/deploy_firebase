const express = require('express');
const saleRouter = express.Router();
import { authentication } from '../middleware/authentication';
import { handleError } from '../utils/response.error';
import saleController from '../controller/controller.sale';
import { authorization } from '../middleware/authorization';

const sale = new saleController();

//routes
saleRouter.get('/sale', authorization(['admin']), handleError(sale.getAllSale));
export default saleRouter;
