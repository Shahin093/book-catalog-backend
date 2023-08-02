import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { BookService } from "./books.service";
import { IBook } from "./books.interface";

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
  updateBook,
  deleteBook,
  bookDetails,
};
