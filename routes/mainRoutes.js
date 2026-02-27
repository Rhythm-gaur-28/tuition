const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getHome);
router.post('/contact', mainController.postContact);

module.exports = router;
