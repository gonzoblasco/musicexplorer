// __tests__/lib/utils/formatters.test.ts
import {
  formatDate,
  truncateText,
  formatUrl,
} from "../../../lib/utils/formatters";

describe("formatDate", () => {
  it("returns formatted date for valid input", () => {
    const result = formatDate("2023-05-15");
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it("returns N/A for undefined input", () => {
    expect(formatDate(undefined)).toBe("N/A");
  });

  it("returns N/A for invalid date input", () => {
    expect(formatDate("invalid-date")).toBe("N/A");
  });
});

describe("truncateText", () => {
  it("truncates text longer than maxLength", () => {
    const longText = "This is a very long text that should be truncated";
    expect(truncateText(longText, 10)).toBe("This is a ...");
  });

  it("does not truncate text shorter than maxLength", () => {
    const shortText = "Short text";
    expect(truncateText(shortText, 20)).toBe(shortText);
  });

  it("returns empty string for undefined input", () => {
    expect(truncateText(undefined)).toBe("");
  });
});

describe("formatUrl", () => {
  it("returns URL as is if it starts with http", () => {
    const url = "https://example.com";
    expect(formatUrl(url)).toBe(url);
  });

  it("adds https:// prefix to URL without protocol", () => {
    expect(formatUrl("example.com")).toBe("https://example.com");
  });

  it("returns empty string for undefined input", () => {
    expect(formatUrl(undefined)).toBe("");
  });
});
