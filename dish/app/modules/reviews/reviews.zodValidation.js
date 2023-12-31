"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewZodValidation = void 0;
const zod_1 = require("zod");
const reviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: "Review is required",
        }),
    }),
});
exports.ReviewZodValidation = {
    reviewZodSchema,
};
