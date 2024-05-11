"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/signin', authController_1.signin);
router.post('/signup', authController_1.signup);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post('/refreshtoken', authController_1.refreshToken);
router.post('/logout', authController_1.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map