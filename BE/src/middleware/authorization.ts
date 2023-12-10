import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN, UnAuthorized } from '../utils/response.error';

const jwt = require('jsonwebtoken');
export const authorization = (authority: any) => (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return new UnAuthorized('Missing token. Authorization denied.').send(res);
    }

    jwt.verify(token, process.env.SECRET, function (err: Error, decoded: any) {
        console.log(decoded);
        if (decoded) {
            if (authority.includes(decoded.role) || decoded.email === req.body.email || decoded.email === req.body.username) {
                next();
            } else return new FORBIDDEN('You do not have permission to access this resource.').send(res);
        } else if (err) {
            return new UnAuthorized('Missing token. Authorization denied.').send(res);
        }
    });
};
