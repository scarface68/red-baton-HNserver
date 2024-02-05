const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const newsItemController = require("../controllers/newsItemController");
const authenticateUser = require("../middlewares/authenticateUser");

// Default Route
router.get("/", (req, res) => {
  res.json({
    message: "This is the API for Hacker News clone app",
    version: "1.0.0",
    status: "Running",
    timestamp: new Date().toISOString(),
    routes: {
      "/signup": {
        POST: "Public - Creates a new User",
      },
      "/login": {
        POST: "Public - Logs in a user",
      },
      "/news-items": {
        GET: "Protected - Retrieves all news items for a user",
        POST: "Protected - Crawls and adds/updates news items to the database",
      },
      "/news-items/:id/read": {
        PUT: "Protected - Updates news item as read for user", 
      },
      "/news-items/:id/delete": {
        PUT: "Protected - Deletes news item for user", 
      },
    },
  });
});

// User Authentication
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// News Items
router.get("/news-items", authenticateUser, newsItemController.getAll);
router.post(
  "/news-items",
  authenticateUser,
  newsItemController.crawlAndAddOrUpdate
);
router.put(
  "/news-items/:id/read",
  authenticateUser,
  newsItemController.markAsRead
);
router.put(
  "/news-items/:id/delete",
  authenticateUser,
  newsItemController.markAsDeleted
);

module.exports = router;
