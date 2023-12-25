"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const saleRouter = express.Router();
const response_error_1 = require("../utils/response.error");
const controller_sale_1 = __importDefault(require("../controller/controller.sale"));
const authorization_1 = require("../middleware/authorization");
const sale = new controller_sale_1.default();
//routes
saleRouter.get('/sale', (0, authorization_1.authorization)(['admin']), (0, response_error_1.handleError)(sale.getAllSale));
exports.default = saleRouter;
