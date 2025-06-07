const Basic = require('../models/Basic');

// Get the single basic info
// GET /api/admin/basic
exports.getBasic = async (req, res) => {
  try {
    const basic = await Basic.findOne();
    if (!basic) {
      return res.status(404).json({ message: 'Basic info not found' });
    }
    res.status(200).json(basic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update the single basic info
//PUT /api/admin/content/basic
exports.updateBasic = async (req, res) => {
  const { name, logoUrl, desc } = req.body;
  
  if (!name || !logoUrl || !desc) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Remove any existing documents
    await Basic.deleteMany({});
    // Create new document
    const basic = await Basic.create({ name, logoUrl, desc });
    res.status(200).json(basic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
