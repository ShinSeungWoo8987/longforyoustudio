"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader)
        return res.sendStatus(403);
    try {
        const token = authHeader.split('ShinSeungWoo ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
                throw err;
            req.body.user = user;
            next();
        });
    }
    catch (err) {
        return res.sendStatus(401);
    }
};
exports.default = verifyToken;
