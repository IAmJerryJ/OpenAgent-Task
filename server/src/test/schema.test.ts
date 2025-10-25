import { describe, it, expect } from "vitest";
import {
  createContactSchema,
  updateContactSchema,
  queryParamsSchema,
  idParamSchema,
} from "../schemas/contactSchemas";

describe("Contact Schemas", () => {
  describe("createContactSchema", () => {
    describe("valid data", () => {
      it("should validate complete contact data", () => {
        const validData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          note: "This is a test note",
        };

        const result = createContactSchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1 234 567 8900",
            note: "This is a test note",
          });
        }
      });

      it("should validate contact data without note", () => {
        const validData = {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "1234567890",
            note: undefined,
          });
        }
      });

      it("should trim whitespace from strings", () => {
        const dataWithWhitespace = {
          firstName: "  John  ",
          lastName: "  Doe  ",
          email: "john.doe@example.com",
          phone: "  +1 234 567 8900  ",
          note: "  This is a test note  ",
        };

        const result = createContactSchema.safeParse(dataWithWhitespace);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.firstName).toBe("John");
          expect(result.data.lastName).toBe("Doe");
          expect(result.data.email).toBe("john.doe@example.com");
          expect(result.data.phone).toBe("+1 234 567 8900");
          expect(result.data.note).toBe("This is a test note");
        }
      });

      it("should reject whitespace-only strings", () => {
        const dataWithWhitespace = {
          firstName: "   ",
          lastName: "   ",
          email: "   ",
          phone: "   ",
        };

        const result = createContactSchema.safeParse(dataWithWhitespace);
        expect(result.success).toBe(false);
      });

      it("should convert email to lowercase", () => {
        const dataWithUppercaseEmail = {
          firstName: "John",
          lastName: "Doe",
          email: "JOHN.DOE@EXAMPLE.COM",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(dataWithUppercaseEmail);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.email).toBe("john.doe@example.com");
        }
      });
    });

    describe("invalid data", () => {
      it("should reject empty firstName", () => {
        const invalidData = {
          firstName: "",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("First name is required");
        }
      });

      it("should reject firstName that is too long", () => {
        const invalidData = {
          firstName: "A".repeat(51),
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "First name must be 50 characters or less"
          );
        }
      });

      it("should reject empty lastName", () => {
        const invalidData = {
          firstName: "John",
          lastName: "",
          email: "john.doe@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Last name is required");
        }
      });

      it("should reject lastName that is too long", () => {
        const invalidData = {
          firstName: "John",
          lastName: "A".repeat(51),
          email: "john.doe@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Last name must be 50 characters or less"
          );
        }
      });

      it("should reject invalid email format", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "invalid-email",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid email format");
        }
      });

      it("should reject email that is too long", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "a".repeat(100) + "@example.com",
          phone: "1234567890",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Email must be 100 characters or less"
          );
        }
      });

      it("should reject empty phone", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Phone number must be at least 1 character"
          );
        }
      });

      it("should reject phone that is too long", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1".repeat(21),
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Phone number must be 20 characters or less"
          );
        }
      });

      it("should reject phone with invalid characters", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "123-abc-456",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Phone number contains invalid characters"
          );
        }
      });

      it("should reject note that is too long", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          note: "A".repeat(501),
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Note must be 500 characters or less"
          );
        }
      });

      it("should reject missing required fields", () => {
        const invalidData = {
          firstName: "John",
        };

        const result = createContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThan(0);
        }
      });
    });

    describe("phone number validation", () => {
      it("should accept valid phone formats", () => {
        const validPhones = [
          "1234567890",
          "+1 234 567 8900",
          "(123) 456-7890",
          "123-456-7890",
          "+1-234-567-8900",
          "123 456 7890",
        ];

        validPhones.forEach(phone => {
          const data = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone,
          };

          const result = createContactSchema.safeParse(data);
          expect(result.success).toBe(true);
        });
      });

      it("should reject invalid phone formats", () => {
        const invalidPhones = [
          "123-abc-456",
          "123@456#789",
          "123.456.789",
          "123/456/789",
          "123_456_789",
        ];

        invalidPhones.forEach(phone => {
          const data = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone,
          };

          const result = createContactSchema.safeParse(data);
          expect(result.success).toBe(false);
        });
      });
    });
  });

  describe("updateContactSchema", () => {
    describe("valid data", () => {
      it("should validate partial update data", () => {
        const updateData = {
          firstName: "John",
          email: "john.doe@example.com",
        };

        const result = updateContactSchema.safeParse(updateData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            firstName: "John",
            email: "john.doe@example.com",
          });
        }
      });

      it("should validate complete update data", () => {
        const updateData = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          note: "Updated note",
          verified: true,
        };

        const result = updateContactSchema.safeParse(updateData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            note: "Updated note",
            verified: true,
          });
        }
      });

      it("should validate empty object", () => {
        const updateData = {};

        const result = updateContactSchema.safeParse(updateData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({});
        }
      });

      it("should trim whitespace and convert email to lowercase", () => {
        const updateData = {
          firstName: "  John  ",
          email: "JOHN.DOE@EXAMPLE.COM",
        };

        const result = updateContactSchema.safeParse(updateData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.firstName).toBe("John");
          expect(result.data.email).toBe("john.doe@example.com");
        }
      });

      it("should reject whitespace-only strings in update", () => {
        const updateData = {
          firstName: "   ",
          email: "   ",
        };

        const result = updateContactSchema.safeParse(updateData);
        expect(result.success).toBe(false);
      });
    });

    describe("invalid data", () => {
      it("should reject firstName that is too long", () => {
        const invalidData = {
          firstName: "A".repeat(51),
        };

        const result = updateContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "First name must be 50 characters or less"
          );
        }
      });

      it("should reject invalid email format", () => {
        const invalidData = {
          email: "invalid-email",
        };

        const result = updateContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid email format");
        }
      });

      it("should reject phone with invalid characters", () => {
        const invalidData = {
          phone: "123-abc-456",
        };

        const result = updateContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Phone number contains invalid characters"
          );
        }
      });

      it("should reject note that is too long", () => {
        const invalidData = {
          note: "A".repeat(501),
        };

        const result = updateContactSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Note must be 500 characters or less"
          );
        }
      });
    });
  });

  describe("queryParamsSchema", () => {
    describe("valid data", () => {
      it("should validate default parameters", () => {
        const queryParams = {};

        const result = queryParamsSchema.safeParse(queryParams);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            page: 1,
            limit: 10,
            search: undefined,
          });
        }
      });

      it("should validate custom parameters", () => {
        const queryParams = {
          page: "2",
          limit: "20",
          search: "John",
        };

        const result = queryParamsSchema.safeParse(queryParams);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            page: 2,
            limit: 20,
            search: "John",
          });
        }
      });

      it("should validate search term", () => {
        const queryParams = {
          search: "test search",
        };

        const result = queryParamsSchema.safeParse(queryParams);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.search).toBe("test search");
        }
      });
    });

    describe("invalid data", () => {
      it("should reject page that is not greater than 0", () => {
        const invalidParams = {
          page: "0",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Page must be greater than 0"
          );
        }
      });

      it("should reject negative page", () => {
        const invalidParams = {
          page: "-1",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Page must be greater than 0"
          );
        }
      });

      it("should reject limit that is too high", () => {
        const invalidParams = {
          limit: "101",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Limit must be between 1 and 100"
          );
        }
      });

      it("should reject limit that is too low", () => {
        const invalidParams = {
          limit: "0",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Limit must be between 1 and 100"
          );
        }
      });

      it("should reject search term that is too long", () => {
        const invalidParams = {
          search: "A".repeat(101),
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Search term must be 100 characters or less"
          );
        }
      });

      it("should reject non-numeric page", () => {
        const invalidParams = {
          page: "abc",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
      });

      it("should reject non-numeric limit", () => {
        const invalidParams = {
          limit: "abc",
        };

        const result = queryParamsSchema.safeParse(invalidParams);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("idParamSchema", () => {
    describe("valid data", () => {
      it("should validate positive integer ID", () => {
        const idParam = { id: "123" };

        const result = idParamSchema.safeParse(idParam);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({ id: 123 });
        }
      });

      it("should validate single digit ID", () => {
        const idParam = { id: "1" };

        const result = idParamSchema.safeParse(idParam);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({ id: 1 });
        }
      });

      it("should validate large ID", () => {
        const idParam = { id: "999999" };

        const result = idParamSchema.safeParse(idParam);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({ id: 999999 });
        }
      });
    });

    describe("invalid data", () => {
      it("should reject zero ID", () => {
        const invalidParam = { id: "0" };

        const result = idParamSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid ID format");
        }
      });

      it("should reject negative ID", () => {
        const invalidParam = { id: "-1" };

        const result = idParamSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid ID format");
        }
      });

      it("should reject non-numeric ID", () => {
        const invalidParam = { id: "abc" };

        const result = idParamSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid ID format");
        }
      });

      it("should accept decimal ID (parsed as integer)", () => {
        const validParam = { id: "123.45" };

        const result = idParamSchema.safeParse(validParam);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.id).toBe(123);
        }
      });

      it("should reject empty ID", () => {
        const invalidParam = { id: "" };

        const result = idParamSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid ID format");
        }
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle whitespace-only strings in createContactSchema", () => {
      const dataWithWhitespace = {
        firstName: "   ",
        lastName: "   ",
        email: "   ",
        phone: "   ",
      };

      const result = createContactSchema.safeParse(dataWithWhitespace);
      expect(result.success).toBe(false);
    });

    it("should handle very long strings", () => {
      const longString = "A".repeat(1000);
      const data = {
        firstName: longString,
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
      };

      const result = createContactSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should handle special characters in valid fields", () => {
      const data = {
        firstName: "José",
        lastName: "García-López",
        email: "jose.garcia@example.com",
        phone: "+34 123 456 789",
      };

      const result = createContactSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should handle unicode characters", () => {
      const data = {
        firstName: "李",
        lastName: "明",
        email: "ming.li@example.com",
        phone: "+86 138 0013 8000",
      };

      const result = createContactSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
