import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./reviews.service";

// create reviews
const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;

  const result = await ReviewService.createReview(reviewData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created Successfully",
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ReviewService.getReview(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews Retrieve Successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReview,
};
