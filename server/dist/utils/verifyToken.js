"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('authHeader ::', authHeader);
    if (authHeader !== undefined) {
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
        console.log('decoded header ::', decoded === null || decoded === void 0 ? void 0 : decoded.header);
        console.log('decoded payload ::', decoded === null || decoded === void 0 ? void 0 : decoded.payload);
        console.log('token ::', token);
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err !== null) {
                console.log('token Error ::', err);
                return res.sendStatus(403);
            }
            ;
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map