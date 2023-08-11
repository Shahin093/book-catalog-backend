import { Model, Types } from "mongoose";

export type IReview = {
  review: string;
  book: Types.ObjectId | IReview;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
