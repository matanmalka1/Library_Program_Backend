import { unlink } from "fs/promises";
import { z } from "zod";
import { buildValidationError, zodErrorsToFields } from "./validatorUtils.js";

// Validate that a file was uploaded.
export const validateUpload = async (req, _res, next) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES
    ? process.env.ALLOWED_FILE_TYPES.split(",").map((value) => value.trim())
    : ["image/jpeg", "image/png", "image/gif", "application/pdf"];

  const uploadSchema = z
    .object({
      file: z.any(),
    })
    .superRefine((data, ctx) => {
      if (!data.file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file"],
          message: "File is required",
        });
        return;
      }

      if (!allowedTypes.includes(data.file.mimetype)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file"],
          message: `File type ${data.file.mimetype} is not allowed`,
        });
      }
    });

  const result = uploadSchema.safeParse({ file: req.file });
  if (!result.success) {
    if (req.file?.path) {
      try {
        await unlink(req.file.path);
      } catch {
        // Ignore cleanup errors to avoid masking validation results.
      }
    }
    return next(buildValidationError(zodErrorsToFields(result.error)));
  }

  return next();
};
