import { z } from "zod";
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is Required",
    }),
    description: z.string({
      required_error: "description is required",
    }),
    genre: z.string({
      required_error: "genre is required",
    }),
    publication_date: z.string({
      required_error: "publication_date is required",
    }),
    review: z.string({
      required_error: "review is required",
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    genre: z.string().optional(),
    publication_date: z.string().optional(),
    review: z.string().optional(),
  }),
});

export const BookZodValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
