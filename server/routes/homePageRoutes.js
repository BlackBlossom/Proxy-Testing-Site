// server/routes/homePageRoutes.js
const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');
const {
    getHomePage,
    updateHomePage,
    updateHero,
    addFeature,
    updateFeature,
    deleteFeature,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/homePageController');

// Get home page
router.get('/', getHomePage);

// Middleware to protect admin routes
router.use(protectAdmin);

// Update entire home page
router.put('/', updateHomePage);

// Update only hero section
router.put('/hero', updateHero);

// Features CRUD
router.post('/features', addFeature);
router.put('/features/:index', updateFeature);
router.delete('/features/:index', deleteFeature);

// FAQ CRUD
router.post('/faq', addFAQ);
router.put('/faq/:index', updateFAQ);
router.delete('/faq/:index', deleteFAQ);

// Testimonials CRUD
router.post('/testimonials', addTestimonial);
router.put('/testimonials/:index', updateTestimonial);
router.delete('/testimonials/:index', deleteTestimonial);

module.exports = router;
