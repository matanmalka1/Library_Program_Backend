import * as wishlistService from "../services/wishlist.service.js";
import { successResponse } from "../utils/response.js";

// READ ALL
// Get the authenticated user's wishlist.
export const getWishlist = async (req, res) => {
  const items = await wishlistService.getWishlist(req.user.id);
  successResponse(res, { items }, "Wishlist retrieved successfully");
};

// CREATE
// Toggle a book in the authenticated user's wishlist.
export const toggleWishlist = async (req, res) => {
  const items = await wishlistService.toggleWishlist(
    req.user.id,
    req.body.bookId
  );
  successResponse(res, { items }, "Wishlist updated successfully");
};

// DELETE
// Clear the authenticated user's wishlist.
export const clearWishlist = async (req, res) => {
  await wishlistService.clearWishlist(req.user.id);
  successResponse(res, null, "Wishlist cleared successfully");
};
