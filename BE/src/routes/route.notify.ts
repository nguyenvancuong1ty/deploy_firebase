const express = require('express');
const notifyRouter = express.Router();
import { authentication } from '../middleware/authentication';
import { cache } from '../middleware/cache';
import { handleError } from '../utils/response.error';
import notifyController from '../controller/controller.notify';

const notify = new notifyController();

//routes
notifyRouter.get('/notify/public', authentication, handleError(notify.getNotifyAllUser));
notifyRouter.get('/notify/:uid', authentication, handleError(notify.getNotifyOfUser));
notifyRouter.patch('/notify/:id', authentication, handleError(notify.updateNotify));
export default notifyRouter;
