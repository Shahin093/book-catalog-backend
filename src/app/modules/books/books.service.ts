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

export const BookService = {
  createBook,
  updateBook,
};
