// server/routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');
const homePageRoutes = require('./homePageRoutes');
const adRoutes = require('./adRoutes');
const uploadImageRoute = require('./uploadImage')

router.use('/home', homePageRoutes);

router.use('/ads', adRoutes);

router.use('/upload-image', uploadImageRoute);

const {
  getPrivacy,
  createPrivacy,
  updatePrivacy,
  deletePrivacy
} = require('../controllers/privacyController');

const {
  getTerms,
  createTerms,
  updateTerms,
  deleteTerms
} = require('../controllers/termsController');

const {
  getBasic,
  updateBasic
} = require('../controllers/basicController');

// Public routes for front end
router.get('/basic', getBasic);
router.get('/privacy', getPrivacy);
router.get('/terms', getTerms);

// Protected admin routes (content management)
router.use(protectAdmin);

router.put('/content/basic', updateBasic);

router.post('/content/privacy', createPrivacy);
router.put('/content/privacy/:id', updatePrivacy);
router.delete('/content/privacy/:id', deletePrivacy);

router.post('/content/terms', createTerms);
router.put('/content/terms/:id', updateTerms);
router.delete('/content/terms/:id', deleteTerms);

module.exports = router;
