"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const response_error_1 = require("../utils/response.error");
const jwt = require('jsonwebtoken');
const authorization = (authority) => (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return new response_error_1.UnAuthorized('Missing token. Authorization denied.').send(res);
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        console.log(decoded);
        console.log(req.body);
        if (decoded) {
            if (authority.includes(decoded.role) || decoded.email === req.body.email || decoded.email === req.body.username) {
                next();
            }
            else
                return new response_error_1.FORBIDDEN('You do not have permission to access this resource.').send(res);
        }
        else if (err) {
            return new response_error_1.UnAuthorized('Missing token. Authorization denied.').send(res);
        }
    });
};
exports.authorization = authorization;
