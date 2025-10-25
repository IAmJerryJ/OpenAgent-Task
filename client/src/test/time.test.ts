import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { formatSydneyTime } from "@/lib/time";

describe("Time Utilities", () => {
  let originalDate: DateConstructor;

  beforeEach(() => {
    originalDate = global.Date;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  describe("formatSydneyTime", () => {
    it("should format a valid ISO date string to Sydney time", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(result).toContain("2024");
    });

    it("should handle different time zones correctly", () => {
      const utcDate = "2024-01-15T00:00:00Z";
      const result = formatSydneyTime(utcDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should format date with milliseconds", () => {
      const testDate = "2024-01-15T10:30:00.123Z";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle date without time component", () => {
      const testDate = "2024-01-15";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle different months correctly", () => {
      const janDate = "2024-01-15T10:30:00Z";
      const junDate = "2024-06-15T10:30:00Z";
      const decDate = "2024-12-15T10:30:00Z";

      const janResult = formatSydneyTime(janDate);
      const junResult = formatSydneyTime(junDate);
      const decResult = formatSydneyTime(decDate);

      expect(janResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(junResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(decResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle leap year dates", () => {
      const leapYearDate = "2024-02-29T10:30:00Z";
      const result = formatSydneyTime(leapYearDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(result).toContain("2024");
    });

    it("should handle edge case times", () => {
      const midnight = "2024-01-15T00:00:00Z";
      const noon = "2024-01-15T12:00:00Z";
      const endOfDay = "2024-01-15T23:59:59Z";

      const midnightResult = formatSydneyTime(midnight);
      const noonResult = formatSydneyTime(noon);
      const endOfDayResult = formatSydneyTime(endOfDay);

      expect(midnightResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(noonResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(endOfDayResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle different years", () => {
      const pastYear = "2020-01-15T10:30:00Z";
      const futureYear = "2030-01-15T10:30:00Z";

      const pastResult = formatSydneyTime(pastYear);
      const futureResult = formatSydneyTime(futureYear);

      expect(pastResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(futureResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(pastResult).toContain("2020");
      expect(futureResult).toContain("2030");
    });

    it("should use Australian locale format", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle daylight saving time transitions", () => {
      const beforeDST = "2024-03-31T01:30:00Z";
      const afterDST = "2024-04-01T01:30:00Z";

      const beforeResult = formatSydneyTime(beforeDST);
      const afterResult = formatSydneyTime(afterDST);

      expect(beforeResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(afterResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle timezone offset correctly", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should return consistent format for same input", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const result1 = formatSydneyTime(testDate);
      const result2 = formatSydneyTime(testDate);

      expect(result1).toBe(result2);
    });

    it("should handle invalid date strings gracefully", () => {
      const invalidDate = "invalid-date";
      const result = formatSydneyTime(invalidDate);

      expect(result).toBe("Invalid Date");
    });

    it("should handle empty string", () => {
      const emptyDate = "";
      const result = formatSydneyTime(emptyDate);

      expect(result).toBe("Invalid Date");
    });

    it("should handle null and undefined inputs", () => {
      expect(() => formatSydneyTime(null as unknown as string)).not.toThrow();
      expect(() =>
        formatSydneyTime(undefined as unknown as string)
      ).not.toThrow();
    });

    it("should format with correct timezone", () => {
      const testDate = "2024-01-15T00:00:00Z";
      const result = formatSydneyTime(testDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle different date formats", () => {
      const isoDate = "2024-01-15T10:30:00Z";
      const dateOnly = "2024-01-15";
      const withTime = "2024-01-15T10:30:00";

      const isoResult = formatSydneyTime(isoDate);
      const dateOnlyResult = formatSydneyTime(dateOnly);
      const withTimeResult = formatSydneyTime(withTime);

      expect(isoResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(dateOnlyResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(withTimeResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should maintain consistent output format", () => {
      const testDates = [
        "2024-01-01T00:00:00Z",
        "2024-06-15T12:30:45Z",
        "2024-12-31T23:59:59Z",
      ];

      testDates.forEach(date => {
        const result = formatSydneyTime(date);
        expect(result).toMatch(
          /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
        );
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle very old dates", () => {
      const oldDate = "1900-01-01T00:00:00Z";
      const result = formatSydneyTime(oldDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(result).toContain("1900");
    });

    it("should handle very future dates", () => {
      const futureDate = "2100-12-31T23:59:59Z";
      const result = formatSydneyTime(futureDate);

      expect(result).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(result).toContain("2101");
    });

    it("should handle leap year correctly", () => {
      const leapYear = "2024-02-29T12:00:00Z";
      const nonLeapYear = "2023-02-28T12:00:00Z";

      const leapResult = formatSydneyTime(leapYear);
      const nonLeapResult = formatSydneyTime(nonLeapYear);

      expect(leapResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(nonLeapResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });

    it("should handle timezone edge cases", () => {
      const utcMidnight = "2024-01-15T00:00:00Z";
      const utcNoon = "2024-01-15T12:00:00Z";

      const midnightResult = formatSydneyTime(utcMidnight);
      const noonResult = formatSydneyTime(utcNoon);

      expect(midnightResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
      expect(noonResult).toMatch(
        /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (am|pm)$/
      );
    });
  });

  describe("Performance", () => {
    it("should handle multiple calls efficiently", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        formatSydneyTime(testDate);
      }

      const end = performance.now();
      expect(end - start).toBeLessThan(1000);
    });

    it("should not throw on rapid successive calls", () => {
      const testDate = "2024-01-15T10:30:00Z";

      expect(() => {
        for (let i = 0; i < 100; i++) {
          formatSydneyTime(testDate);
        }
      }).not.toThrow();
    });
  });
});
