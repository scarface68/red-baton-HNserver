const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const newsItemController = require('../controllers/newsItemController');
const authenticateUser = require('../middlewares/authenticateUser');

// User Authentication
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// News Items
router.get('/news-items', authenticateUser, newsItemController.getAll);
router.post('/news-items', authenticateUser, newsItemController.crawlAndAddOrUpdate);
router.put('/news-items/:id/read', authenticateUser, newsItemController.markAsRead);
router.put('/news-items/:id/delete', authenticateUser, newsItemController.markAsDeleted);

module.exports = router;