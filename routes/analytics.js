const express = require("express");
const router = express.Router();
const { getShortUrl } = require("../services/dynamoService");

router.get("/analytics/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const item = await getShortUrl(shortId);

    if (!item) {
      return res.status(404).json({ error: "Short ID not found" });
    }

    const data = {
      shortId: item.shortId,
      originalUrl: item.originalUrl,
      createdAt: new Date(item.createdAt).toISOString(),
      expiresAt: new Date(item.expiresAt * 1000).toISOString(),
      hitCount: item.hitCount || 0,
      lastAccessed: item.lastAccessed
        ? new Date(item.lastAccessed).toISOString()
        : null,
      createdBy: item.createdBy,
      isActive: item.isActive
    };

    return res.json(data);
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ error: "Failed to retrieve analytics" });
  }
});

module.exports = router;
