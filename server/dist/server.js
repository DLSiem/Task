"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const verifyToken_1 = require("./utils/verifyToken");
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', verifyToken_1.verifyToken, (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', authRoutes_1.default);
mongoose_1.default
    .connect((_b = process.env.MONGOOSE_URL) !== null && _b !== void 0 ? _b : '')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log('Error connecting to MongoDB', error);
});
//# sourceMappingURL=server.js.map