import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  description: string;
  genre: string;
  publication_date: string;
  review: string;
};

export type IStudentFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};

export type IBookFilters = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
