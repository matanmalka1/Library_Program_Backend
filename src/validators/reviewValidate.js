import { z } from "zod";
import {
  nonEmptyStringSchema,
  ratingSchema,
  runSchema,
  validateObjectIdParam,
} from "./validatorUtils.js";

export const validateBookIdParam = validateObjectIdParam("book");

export const validateReviewIdParam = validateObjectIdParam(
  "review",
  "reviewId"
);

export const validateCreateReview = (req, _res, next) => {
  const createReviewSchema = z.object({
    rating: ratingSchema,
    comment: nonEmptyStringSchema("Comment is required"),
  });

  return runSchema(createReviewSchema, req.body ?? {}, next);
};
