"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const reviews_zodValidation_1 = require("./reviews.zodValidation");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/create-review", (0, zodValidateRequest_1.default)(reviews_zodValidation_1.ReviewZodValidation.reviewZodSchema), reviews_controller_1.ReviewController.createReview);
router.get("/:id", reviews_controller_1.ReviewController.getReview);
exports.ReviewRoutes = router;
