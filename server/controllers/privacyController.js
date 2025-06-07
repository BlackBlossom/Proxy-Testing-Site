// server/controllers/privacyController.js
const PrivacySection = require('../models/PrivacySection');

// GET /api/privacy
exports.getPrivacy = async (req, res, next) => {
  try {
    const sections = await PrivacySection.find().sort({ id: 1 });
    res.json(sections);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/content/privacy
exports.createPrivacy = async (req, res, next) => {
  try {
    const newSection = await PrivacySection.create(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/content/privacy/:id
exports.updatePrivacy = async (req, res, next) => {
  try {
    const updated = await PrivacySection.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/content/privacy/:id
exports.deletePrivacy = async (req, res, next) => {
  try {
    await PrivacySection.findOneAndDelete({ id: Number(req.params.id) });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
