import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .trim(),
  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be 100 characters or less")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[\d\s\-\+\(\)]+$/, "Phone number contains invalid characters")
    .trim(),
  note: z
    .string()
    .max(500, "Note must be 500 characters or less")
    .optional()
    .default(""),
});

export const updateContactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .trim()
    .optional(),
  email: z
    .email("Invalid email format")
    .max(100, "Email must be 100 characters or less")
    .transform((val) => val.toLowerCase().trim())
    .optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[\d\s\-+()]+$/, "Phone number contains invalid characters")
    .trim()
    .optional(),
  note: z.string().max(500, "Note must be 500 characters or less").optional(),
  verified: z.boolean().optional(),
});

export const queryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "Page must be greater than 0"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100"),
  search: z
    .string()
    .max(100, "Search term must be 100 characters or less")
    .optional(),
});

export const idParamSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, "Invalid ID format"),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
export type QueryParams = z.infer<typeof queryParamsSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
