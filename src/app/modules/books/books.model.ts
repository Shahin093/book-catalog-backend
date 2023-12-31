import { Schema, Types, model } from "mongoose";
import { BookModel, IBook } from "./books.interface";

//  Create a Schema corresponding to the document interface.
const booksSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    review: {
      type: String,
    },
    bookStructure: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
export const Book = model<IBook, BookModel>("Book", booksSchema);
