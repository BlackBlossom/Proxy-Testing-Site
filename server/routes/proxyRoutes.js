const express = require('express');
const router = express.Router();
const testProxies = require('../utils/proxyTester');

router.post('/test', async (req, res) => {
  try {
    if (!Array.isArray(req.body.proxies)) {
      return res.status(400).json({ error: "Proxies must be an array" });
    }
    const results = await testProxies(req.body.proxies);
    res.json(results);
  } catch (err) {
    console.error('Proxy test error:', err);
    res.status(500).json({ 
      error: 'Proxy test failed',
      details: err.message 
    });
  }
});

module.exports = router;
