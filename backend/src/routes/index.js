const express = require('express');
const router = express.Router();

// Example routes - you can expand these as needed
router.get('/patients', (req, res) => {
  res.json({
    message: 'Get all patients',
    data: []
  });
});

router.post('/patients', (req, res) => {
  res.status(201).json({
    message: 'Patient created',
    data: req.body
  });
});

module.exports = router;
