import * as bookService from "../services/book.service.js";
import { successResponse } from "../utils/response.js";
import { getUserFromToken } from "../utils/auth-helpers.js";

// CREATE
// Create a new book entry.
export const createBook = async (req, res) => {
  const book = await bookService.createBook(req.body);
  successResponse(res, { book }, "Book created successfully", 201);
};

// READ ALL
// List books with pagination and filters.
export const getAllBooks = async (req, res) => {
  let includePendingReviews = false;
  if (req.query.includePendingReviews === "true") {
    const user = await getUserFromToken(req.headers.authorization);
    includePendingReviews = user?.role?.name === "admin";
  }

  const result = await bookService.getAllBooks(req.query, {
    includePendingReviews,
  });
  successResponse(res, result, "Books retrieved successfully");
};

// READ ONE
// Fetch a single book by id.
export const getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  successResponse(res, { book }, "Book retrieved successfully");
};

// READ CATEGORIES
// List distinct book categories.
export const getCategories = async (_req, res) => {
  const categories = await bookService.getCategories();
  successResponse(res, { categories }, "Categories retrieved successfully");
};

// UPDATE
// Update an existing book entry.
export const updateBook = async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  successResponse(res, { book }, "Book updated successfully");
};

// DELETE
// Delete a book and its reviews.
export const deleteBook = async (req, res) => {
  await bookService.deleteBook(req.params.id);
  successResponse(res, null, "Book deleted successfully");
};
