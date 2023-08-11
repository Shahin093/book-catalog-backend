"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookZodValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        author: zod_1.z.string({
            required_error: "Author is Required",
        }),
        description: zod_1.z.string({
            required_error: "description is required",
        }),
        genre: zod_1.z.string({
            required_error: "genre is required",
        }),
        publication_date: zod_1.z.string({
            required_error: "publication_date is required",
        }),
        review: zod_1.z.string({
            required_error: "review is required",
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publication_date: zod_1.z.string().optional(),
        review: zod_1.z.string().optional(),
    }),
});
exports.BookZodValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
