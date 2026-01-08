import { z } from "zod";
import {
  nonEmptyStringSchema,
  objectIdSchema,
  ratingSchema,
  runSchema,
} from "./validatorUtils.js";

export const validateBookIdParam = (req, _res, next) => {
  const paramsSchema = z.object({
    id: objectIdSchema("book"),
  });
  return runSchema(paramsSchema, req.params ?? {}, next);
};

export const validateReviewIdParam = (req, _res, next) => {
  const paramsSchema = z.object({
    reviewId: objectIdSchema("review"),
  });
  return runSchema(paramsSchema, req.params ?? {}, next);
};

export const validateCreateReview = (req, _res, next) => {
  const createReviewSchema = z.object({
    rating: ratingSchema,
    comment: nonEmptyStringSchema("Comment is required"),
  });

  return runSchema(createReviewSchema, req.body ?? {}, next);
};
