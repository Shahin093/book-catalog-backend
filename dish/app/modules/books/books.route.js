"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const books_zodValidation_1 = require("./books.zodValidation");
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.patch("/updateStatus/:id", books_controller_1.BookController.updateBookStatus);
router.get("/", books_controller_1.BookController.getAllBooks);
router.patch("/:id", (0, zodValidateRequest_1.default)(books_zodValidation_1.BookZodValidation.updateBookZodSchema), books_controller_1.BookController.updateBook);
router.get("/user/:id", books_controller_1.BookController.getBooks);
router.get("/:id", books_controller_1.BookController.bookDetails);
router.delete("/:id", books_controller_1.BookController.deleteBook);
router.post("/create-book", (0, zodValidateRequest_1.default)(books_zodValidation_1.BookZodValidation.createBookZodSchema), books_controller_1.BookController.createBook);
exports.BookRoutes = router;
