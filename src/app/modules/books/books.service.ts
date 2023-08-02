import { IBook } from "./books.interface";
import { Book } from "./books.model";

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

export const BookService = {
  createBook,
};
