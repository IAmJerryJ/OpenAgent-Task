import { z } from "zod";

export const contactFormSchema = z.object({
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
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(100, "Email must be 100 characters or less")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^[\d\s\-+()]+$/, "Phone number contains invalid characters")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message must be 500 characters or less")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = {
  [K in keyof ContactFormData]?: string;
};

export const validateContactForm = (
  data: unknown
): {
  success: boolean;
  data?: ContactFormData;
  errors?: ContactFormErrors;
} => {
  try {
    const validatedData = contactFormSchema.parse(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ContactFormErrors = {};
      error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (field) {
          errors[field] = err.message;
        }
      });
      return {
        success: false,
        errors,
      };
    }
    return {
      success: false,
      errors: {
        firstName: "An unexpected error occurred",
      },
    };
  }
};
