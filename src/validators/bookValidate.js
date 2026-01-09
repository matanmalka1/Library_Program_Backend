import { z } from "zod";
import {
  nonEmptyStringSchema,
  nonNegativeNumberSchema,
  objectIdSchema,
  runSchema,
} from "./validatorUtils.js";

export const validateBookIdParam = (req, _res, next) => {
  const paramsSchema = z.object({
    id: objectIdSchema("book"),
  });
  return runSchema(paramsSchema, req.params ?? {}, next);
};

export const validateCreateBook = (req, _res, next) => {
  const createBookSchema = z.object({
    title: nonEmptyStringSchema("Title is required"),
    author: nonEmptyStringSchema("Author is required"),
    price: nonNegativeNumberSchema("Price must be a number >= 0"),
    categories: z
      .array(objectIdSchema("category"), {
        invalid_type_error: "categories must be an array",
      })
      .optional(),
  });

  return runSchema(createBookSchema, req.body ?? {}, next);
};

export const validateUpdateBook = (req, _res, next) => {
  const categorySchema = objectIdSchema("category");
  const updateBookSchema = z.object({
    title: nonEmptyStringSchema("Title must be a non-empty string").optional(),
    author: nonEmptyStringSchema("Author must be a non-empty string").optional(),
    price: nonNegativeNumberSchema("Price must be a number >= 0").optional(),
    stockQuantity: nonNegativeNumberSchema(
      "stockQuantity must be a number >= 0"
    ).optional(),
    categories: z
      .array(categorySchema, {
        invalid_type_error: "categories must be an array",
      })
      .optional(),
  });

  return runSchema(updateBookSchema, req.body ?? {}, next);
};
