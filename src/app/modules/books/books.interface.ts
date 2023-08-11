import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IBook = {
  title: string;
  author: string;
  description: string;
  genre: string;
  publication_date: string;
  review: string;
  bookStructure: string;
  status: boolean;
  user: Types.ObjectId | IUser;
};

export type IStudentFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
