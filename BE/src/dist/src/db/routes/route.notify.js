"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const notifyRouter = express.Router();
const authentication_1 = require("../middleware/authentication");
const response_error_1 = require("../utils/response.error");
const controller_notify_1 = __importDefault(require("../controller/controller.notify"));
const notify = new controller_notify_1.default();
//routes
notifyRouter.get('/notify/public', authentication_1.authentication, (0, response_error_1.handleError)(notify.getNotifyAllUser));
notifyRouter.get('/notify/:uid', authentication_1.authentication, (0, response_error_1.handleError)(notify.getNotifyOfUser));
notifyRouter.patch('/notify/:id', authentication_1.authentication, (0, response_error_1.handleError)(notify.updateNotify));
exports.default = notifyRouter;
