const express = require("express");
const router = express.Router();
const { getShortUrl } = require("../services/dynamoService");
const { updateShortUrlStats } = require("../services/dynamoService");

const SESSION_EXPIRED_URL = "https://example.com/session-expired"; // You can host this as a static page

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const item = await getShortUrl(shortId);

    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (
      !item ||
      !item.isActive ||
      nowInSeconds >= item.expiresAt
    ) {
        console.warn(`Expired or inactive link hit: ${shortId}`);
      return res.redirect(302, SESSION_EXPIRED_URL);
    }

    await updateShortUrlStats(shortId);
    return res.redirect(302, item.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).json({ error: "Unexpected error" });
  }
});

module.exports = router;
