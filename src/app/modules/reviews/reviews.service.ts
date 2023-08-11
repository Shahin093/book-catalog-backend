import { IReview } from "./reviews.interface";
import { Review } from "./reviews.model";

// create a book
const createReview = async (payload: IReview): Promise<IReview | null> => {
  const result = await Review.create(payload);
  return result;
};

const getReview = async (payload: string): Promise<IReview[] | null> => {
  const result = await Review.find({ book: payload });
  return result;
};

export const ReviewService = {
  createReview,
  getReview,
};
