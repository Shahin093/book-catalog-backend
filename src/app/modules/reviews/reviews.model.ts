import { Schema, Types, model } from "mongoose";
import { IReview, ReviewModel } from "./reviews.interface";

//  Create a Schema corresponding to the document interface.
const reviewsSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
    },
    book: {
      type: Types.ObjectId,
      ref: "Book",
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
export const Review = model<IReview, ReviewModel>("Review", reviewsSchema);
