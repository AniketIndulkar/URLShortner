const express = require("express");
const router = express.Router();

const { generateShortId } = require("../services/idGenerator");
const { normalizeUrl } = require("../utils/normalizeUrl");
const { insertShortUrl } = require("../services/dynamoService");

router.post("/", async (req, res) => {
  const { originalUrl, createdBy } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Missing originalUrl" });
  }

  const { valid, normalizedUrl, hash, error } = normalizeUrl(originalUrl);
  if (!valid) {
    return res.status(400).json({ error: `Invalid URL: ${error}` });
  }

  const shortId = generateShortId();
  const now = Date.now();
  const expiresIn = 60 * 60; // 60 mins
  const ttlEpochSeconds = Math.floor(now / 1000) + expiresIn;

  const item = {
    shortId,
    originalUrl: normalizedUrl,
    originalUrlHash: hash,
    createdAt: now,
    expiresAt: ttlEpochSeconds,
    createdBy: createdBy || "anonymous",
    isActive: true,
    hitCount: 0,
    lastAccessed: now
  };

  try {
    await insertShortUrl(item);
    return res.status(201).json({
      shortUrl: `http://localhost:3000/${shortId}`,
      expiresAt: ttlEpochSeconds
    });
  } catch (err) {
    if (err.code === "ConditionalCheckFailedException") {
      return res.status(409).json({ error: "Short ID collision. Try again." });
    }
    console.error(err);
    return res.status(500).json({ error: "Failed to shorten URL" });
  }
});

module.exports = router;
