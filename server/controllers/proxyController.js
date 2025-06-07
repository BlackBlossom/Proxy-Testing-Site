const { testProxies } = require('../utils/proxyTester');

const testProxy = async (req, res, next) => {
  try {
    const { proxies } = req.body;
    if (!Array.isArray(proxies) || proxies.length === 0) {
      return res.status(400).json({ error: 'A non-empty array of proxies is required' });
    }
    const results = await testProxies(proxies);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = { testProxy };