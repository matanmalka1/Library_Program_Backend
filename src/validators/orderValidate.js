import { z } from "zod";
import {
  nonEmptyStringSchema,
  objectIdSchema,
  positiveIntegerSchema,
  runSchema,
} from "./validatorUtils.js";

const ORDER_STATUSES = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

export const validateOrderIdParam = (req, _res, next) => {
  const paramsSchema = z.object({
    id: objectIdSchema("order"),
  });
  return runSchema(paramsSchema, req.params ?? {}, next);
};

export const validateCreateOrder = (req, _res, next) => {
  const itemSchema = z.object({
    bookId: objectIdSchema("book"),
    quantity: positiveIntegerSchema("quantity must be a positive integer"),
  });

  const createOrderSchema = z.object({
    items: z
      .array(itemSchema, {
        required_error: "items must be a non-empty array",
        invalid_type_error: "items must be a non-empty array",
      })
      .min(1, { message: "items must be a non-empty array" }),
    shippingAddress: nonEmptyStringSchema("shippingAddress is required"),
  });

  return runSchema(createOrderSchema, req.body ?? {}, next);
};

export const validateOrderStatus = (req, _res, next) => {
  const statusSchema = z.object({
    status: z.string().refine((value) => ORDER_STATUSES.includes(value), {
      message: "Invalid order status",
    }),
  });

  return runSchema(statusSchema, req.body ?? {}, next);
};
