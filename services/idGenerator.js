const crypto = require("crypto");
const baseX = require("base-x").default || require("base-x");

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base62 = baseX(BASE62);

function generateShortId(length = 8) {
  const bytes = crypto.randomBytes(8); // 8 bytes = ~11 base62 characters
  const encoded = base62.encode(bytes);
  return encoded.slice(0, length);
}

module.exports = {
  generateShortId
};
