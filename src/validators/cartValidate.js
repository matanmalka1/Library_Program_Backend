import { z } from "zod";
import {
  objectIdSchema,
  positiveIntegerSchema,
  runSchema,
} from "./validatorUtils.js";

export const validateCartPayload = (req, _res, next) => {
  const itemSchema = z.object({
    bookId: objectIdSchema("book"),
    quantity: positiveIntegerSchema("quantity must be a positive integer"),
  });

  const cartSchema = z.object({
    items: z.array(itemSchema, {
      required_error: "items must be an array",
      invalid_type_error: "items must be an array",
    }),
  });

  return runSchema(cartSchema, req.body ?? {}, next);
};
