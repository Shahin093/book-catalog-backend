import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./books.interface";
import { Book } from "./books.model";

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

// update a book

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const bookDetails = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book is Not found!");
  }
  return result;
};

export const BookService = {
  createBook,
  updateBook,
  deleteBook,
  bookDetails,
};
