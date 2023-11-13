const express = require('express');
const accountRouter = express.Router();
import { cache } from '../middleware/cache';
import AccountController from '../controller/controller.account';
import { handleError } from '../utils/response.error';
import { checkApiKey } from '../middleware/auth.Apikey';
import { authentication } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';
import { Response } from 'express';

const accountController = new AccountController();
// accountRouter.use(checkApiKey);
accountRouter.post('/account/login', handleError(accountController.login));
accountRouter.post('/account/login-google', handleError(accountController.handleLoginWithGoogle));
accountRouter.post('/account/', handleError(accountController.create));
accountRouter.post('/account/:id', handleError(accountController.changePassword));
accountRouter.put('/account/:id', authorization(['admin']), handleError(accountController.update));
accountRouter.get('/account/confirm-code/:email', handleError(accountController.confirmCode));
accountRouter.post('/account/change-password/:email', authentication, handleError(accountController.forgetPassword));
accountRouter.post('/registerNotify', handleError(accountController.registerNotify));
accountRouter.post('/notify-all', handleError(accountController.notifyAll));
accountRouter.get('/account', authorization(['admin']), handleError(accountController.getAllAccount));

export default accountRouter;
