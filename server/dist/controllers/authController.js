"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.signup = exports.signin = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let refreshTokens = [];
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find by email id
        const user = yield User_1.default.findOne({ email });
        if (user === null) {
            return res.status(404).json({ message: 'User not found!' });
        }
        // comaring hashed password
        const passwordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid Password' });
        }
        // genertae jwt token
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        const refreshToken = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (err) {
        console.log(err);
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user !== null) {
            console.log('User already exists');
            res.status(400).json({ message: 'User already exists' });
        }
        else {
            try {
                const hashedpassword = yield bcryptjs_1.default.hash(password, 10);
                const name = email.split('@')[0];
                const user = { name, email, password: hashedpassword };
                const newUser = new User_1.default(user);
                yield newUser.save().then(() => {
                    res.status(201).json({ message: 'User created' });
                });
            }
            catch (error) {
                res.status(400).json({ message: error });
                console.log(error);
            }
        }
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.signup = signup;
const refreshToken = (req, res) => {
    const { token } = req.body;
    if (token === null) {
        return res.sendStatus(401);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
    jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err !== null) {
            return res.sendStatus(403);
        }
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        res.json({ accessToken });
    });
};
exports.refreshToken = refreshToken;
const logout = (req, res) => {
    const { token } = req.body;
    if (token === null) {
        return res.sendStatus(401);
    }
    refreshTokens = refreshTokens.filter((t) => t !== token);
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map