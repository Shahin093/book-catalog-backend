import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook, IBookFilters } from "./books.interface";
import { Book } from "./books.model";
import { IPaginationOption } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { bookSearchableFields } from "./books.constant";

// create a book
const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

// get all books

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andCondition?.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
// updateBookStatus
const updateBookStatus = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { status: true },
    {
      new: true,
    }
  );
  return result;
};

// delete a book
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

// book details
const bookDetails = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book is Not found!");
  }
  return result;
};

// get book
const getBooks = async (id: string): Promise<IBook[] | null> => {
  const result = await Book.find({ user: id });
  // console.log(result);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Books is Not found!");
  }
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  bookDetails,
  getBooks,
  updateBookStatus,
};
