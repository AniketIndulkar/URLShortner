const crypto = require("crypto");
const { URL } = require("url");

function normalizeUrl(inputUrl) {
  try {
    const url = new URL(inputUrl);

    // Only allow http and https
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Only http and https are allowed");
    }

    // Normalize: lowercase host and protocol
    url.protocol = url.protocol.toLowerCase();
    url.hostname = url.hostname.toLowerCase();

    // Remove default ports
    if ((url.protocol === "http:" && url.port === "80") ||
        (url.protocol === "https:" && url.port === "443")) {
      url.port = "";
    }

    // Remove fragment
    url.hash = "";

    // Optionally sort query params
    const params = Array.from(url.searchParams.entries());
    params.sort(([a], [b]) => a.localeCompare(b));
    url.search = new URLSearchParams(params).toString();

    const normalized = url.toString();

    return {
      valid: true,
      normalizedUrl: normalized,
      hash: crypto.createHash("sha256").update(normalized).digest("hex")
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

module.exports = {
  normalizeUrl
};
