require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// 👉 Serve static frontend from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// 👉 API routes
const shortenRoute = require("./routes/shorten");
const redirectRoute = require("./routes/redirect");
const analyticsRoute = require("./routes/analytics");

app.use("/shorten", shortenRoute);
app.use("/", analyticsRoute);
app.use("/", redirectRoute); // This should stay last

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener service running on http://localhost:${PORT}`);
});
