const express = require('express');
const router = express.Router();
const azcController = require("../../controllers/azcController");
const auth = require('../../middleware/auth');

// Matches with "/api/azc"
router.get('/', azcController.findAll);

router.post('/selected', azcController.findSelected); 

module.exports = router;