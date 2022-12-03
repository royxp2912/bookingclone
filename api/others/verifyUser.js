import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import { verifyToken } from './verifyToken.js';

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'You are not Authorized.'));
        }
    });
};
