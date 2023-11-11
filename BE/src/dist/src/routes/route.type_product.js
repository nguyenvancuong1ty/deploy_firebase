"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const typeProductRouter = express.Router();
const authentication_1 = require("../middleware/authentication");
const response_error_1 = require("../utils/response.error");
const authorization_1 = require("../middleware/authorization");
const controller_type_product_1 = __importDefault(require("../controller/controller.type_product"));
const typeProductController = new controller_type_product_1.default();
//Middleware check permission
//routes
typeProductRouter.get('/type/product', (0, response_error_1.handleError)(typeProductController.getAllTypeProduct));
typeProductRouter.post('/type/product', authentication_1.authentication, (0, authorization_1.authorization)('admin'), (0, response_error_1.handleError)(typeProductController.addTypeProduct));
exports.default = typeProductRouter;
