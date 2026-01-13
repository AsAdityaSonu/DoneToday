const express = require('express');
const router = express.Router();

// GET /api/test
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString() 
  });
});

module.exports = router;