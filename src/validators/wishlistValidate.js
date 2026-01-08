import { z } from "zod";
import { objectIdSchema, runSchema } from "./validatorUtils.js";

export const validateToggleWishlist = (req, _res, next) => {
  const wishlistSchema = z.object({
    bookId: objectIdSchema("book"),
  });

  return runSchema(wishlistSchema, req.body ?? {}, next);
};
