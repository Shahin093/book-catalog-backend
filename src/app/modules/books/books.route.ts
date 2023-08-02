import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { BookZodValidation } from "./books.zodValidation";
import { BookController } from "./books.controller";

const router = express.Router();

router.post(
  "/create-book",
  zodValidateRequest(BookZodValidation.createBookZodSchema),
  BookController.createBook
);

router.patch(
  "/:id",
  zodValidateRequest(BookZodValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete("/:id", BookController.deleteBook);

export const BookRoutes = router;
