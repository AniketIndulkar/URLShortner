const { normalizeUrl } = require("../utils/normalizeUrl");

describe("URL Normalization and Validation", () => {
  test("validates and normalizes a basic URL", () => {
    const { valid, normalizedUrl } = normalizeUrl("HTTP://Example.com:80/page?a=2&b=1#section");
    expect(valid).toBe(true);
    expect(normalizedUrl).toBe("http://example.com/page?a=2&b=1");
  });

  test("rejects non-http/https URLs", () => {
    const result = normalizeUrl("ftp://example.com");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/Only http and https/);
  });

  test("removes fragment from URL", () => {
    const result = normalizeUrl("https://example.com/page#top");
    expect(result.normalizedUrl.includes("#")).toBe(false);
  });

  test("sorts query parameters alphabetically", () => {
    const result = normalizeUrl("https://example.com/page?b=2&a=1");
    expect(result.normalizedUrl).toBe("https://example.com/page?a=1&b=2");
  });

  test("removes default port 443 for https", () => {
    const result = normalizeUrl("https://example.com:443/");
    expect(result.normalizedUrl).toBe("https://example.com/");
  });

  test("returns hash of normalized URL", () => {
    const result = normalizeUrl("http://example.com/page?a=1");
    expect(result.hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hash
  });

  test("rejects invalid/malformed URL", () => {
    const result = normalizeUrl("ht!!tp://[broken-url]");
    expect(result.valid).toBe(false);
  });
});
