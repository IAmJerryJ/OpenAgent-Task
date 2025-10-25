import { describe, it, expect } from "vitest";
import { validateContactForm } from "@/lib/validation";

describe("Contact Form Validation", () => {
  describe("valid data", () => {
    it("should validate complete contact form data", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        message: "Hello, this is a test message",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        message: "Hello, this is a test message",
      });
    });

    it("should validate contact form without message", () => {
      const validData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "(555) 123-4567",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "(555) 123-4567",
        message: undefined,
      });
    });

    it("should transform email to lowercase", () => {
      const validData = {
        firstName: "Test",
        lastName: "User",
        email: "TEST@EXAMPLE.COM",
        phone: "+86 138 0013 8000",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
      expect(result.data?.email).toBe("test@example.com");
    });
  });

  describe("invalid data", () => {
    it("should reject empty firstName", () => {
      const invalidData = {
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.firstName).toBe("First name is required");
    });

    it("should reject firstName longer than 50 characters", () => {
      const invalidData = {
        firstName: "A".repeat(51),
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.firstName).toBe(
        "First name must be 50 characters or less"
      );
    });

    it("should reject empty lastName", () => {
      const invalidData = {
        firstName: "John",
        lastName: "",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.lastName).toBe("Last name is required");
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.email).toBe("Invalid email format");
    });

    it("should reject email longer than 100 characters", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "a".repeat(95) + "@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.email).toBe("Email must be 100 characters or less");
    });

    it("should reject empty phone", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.phone).toBe(
        "Phone number contains invalid characters"
      );
    });

    it("should reject phone with invalid characters", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234-567-8900 abc",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.phone).toBe(
        "Phone number contains invalid characters"
      );
    });

    it("should reject phone longer than 20 characters", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900 12345",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.phone).toBe(
        "Phone number must be 20 characters or less"
      );
    });

    it("should reject message longer than 500 characters", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        message: "A".repeat(501),
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.message).toBe(
        "Message must be 500 characters or less"
      );
    });
  });

  describe("phone number formats", () => {
    it("should accept phone with spaces", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });

    it("should accept phone with parentheses", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });

    it("should accept phone with dashes", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "555-123-4567",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });

    it("should accept international phone format", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+86 138 0013 8000",
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle whitespace-only strings", () => {
      const invalidData = {
        firstName: "   ",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(true);
      expect(result.data?.firstName).toBe("");
    });

    it("should handle missing required fields", () => {
      const invalidData = {
        firstName: "John",
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors?.lastName).toBe(
        "Invalid input: expected string, received undefined"
      );
      expect(result.errors?.email).toBe("Invalid email format");
      expect(result.errors?.phone).toBe(
        "Invalid input: expected string, received undefined"
      );
    });
  });
});
