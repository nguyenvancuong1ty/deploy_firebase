const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
export const createToken: Function = (field: object = {}) => {

    const accessToken = jwt.sign(field, process.env.SECRET, {
        expiresIn: '2d',
    });
    const refreshToken = jwt.sign(field, process.env.SECRET, {
        expiresIn: '7d',
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
};
