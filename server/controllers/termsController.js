// server/controllers/termsController.js
const TermsSection = require('../models/TermsSection');

// GET /api/terms
exports.getTerms = async (req, res, next) => {
  try {
    const sections = await TermsSection.find().sort({ id: 1 });
    res.json(sections);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/content/terms
exports.createTerms = async (req, res, next) => {
  try {
    const newSection = await TermsSection.create(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/content/terms/:id
exports.updateTerms = async (req, res, next) => {
  try {
    const updated = await TermsSection.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/content/terms/:id
exports.deleteTerms = async (req, res, next) => {
  try {
    await TermsSection.findOneAndDelete({ id: Number(req.params.id) });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
