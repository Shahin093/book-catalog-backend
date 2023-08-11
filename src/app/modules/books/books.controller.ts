import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { BookService } from "./books.service";
import { IBook } from "./books.interface";
import { bookFilterableFields } from "./books.constant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constrants/pagination";

// create book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;

  const result = await BookService.createBook(bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created Successfully",
    data: result,
  });
});

// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);
  console.log(result);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get all books
const getBooks = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getBooks(id);
  console.log(result);
  sendResponse<IBook[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

// update a book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await BookService.updateBook(id, updatedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Updated Successfully",
    data: result,
  });
});
// updateBookStatus
const updateBookStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  // const updatedData = req.body;
  const result = await BookService.updateBookStatus(id);
  console.log("result : ", result);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book status Updated Successfully",
    data: result,
  });
});

// delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);

  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Delete Successfully",
    data: result!,
  });
});

// book details
const bookDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.bookDetails(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Retrieved Successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  bookDetails,
  getBooks,
  updateBookStatus,
};
