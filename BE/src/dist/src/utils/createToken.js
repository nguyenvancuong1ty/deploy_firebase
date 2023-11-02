"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = (field = {}) => {
    const accessToken = jwt.sign(field, process.env.SECRET, {
        expiresIn: '2d',
    });
    const refreshToken = jwt.sign(field, process.env.SECRET, {
        expiresIn: '7d',
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
};
exports.createToken = createToken;
