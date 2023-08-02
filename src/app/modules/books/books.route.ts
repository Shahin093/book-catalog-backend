import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { BookZodValidation } from "./books.zodValidation";
import { BookController } from "./books.controller";

const router = express.Router();
router.get("/", BookController.getAllBooks);

router.patch(
  "/:id",
  zodValidateRequest(BookZodValidation.updateBookZodSchema),
  BookController.updateBook
);

router.get("/:id", BookController.bookDetails);

router.delete("/:id", BookController.deleteBook);
router.post(
  "/create-book",
  zodValidateRequest(BookZodValidation.createBookZodSchema),
  BookController.createBook
);

export const BookRoutes = router;
