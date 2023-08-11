"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const auth_zodValidation_1 = require("./auth.zodValidation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, zodValidateRequest_1.default)(auth_zodValidation_1.AuthZodValidation.loginZodSchema), auth_controller_1.AuthController.signupUser);
router.post("/login", (0, zodValidateRequest_1.default)(auth_zodValidation_1.AuthZodValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", (0, zodValidateRequest_1.default)(auth_zodValidation_1.AuthZodValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
