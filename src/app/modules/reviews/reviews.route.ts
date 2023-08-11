import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { ReviewZodValidation } from "./reviews.zodValidation";
import { ReviewController } from "./reviews.controller";
const router = express.Router();

router.post(
  "/create-review",
  zodValidateRequest(ReviewZodValidation.reviewZodSchema),
  ReviewController.createReview
);

router.get("/:id", ReviewController.getReview);

export const ReviewRoutes = router;
