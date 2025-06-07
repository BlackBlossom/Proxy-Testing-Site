const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');
const {
    getAllAds,
    getAdsByPlacement,
    createAd,
    updateAd,
    deleteAd
} = require('../controllers/adController');


// List all ads (with optional status filter)
router.get('/', getAllAds); // GET /api/admin/ads

// List ads by placement (with optional status filter)
router.get('/:placement', getAdsByPlacement); // GET /api/admin/ads/:placement

// Protected admin routes for ad management
router.use(protectAdmin);

// Create new ad
router.post('/', createAd); // POST /api/admin/ads

// Update ad (status or other fields)
router.put('/:id', updateAd); // PUT /api/admin/ads/:id

// Delete ad
router.delete('/:id', deleteAd); // DELETE /api/admin/ads/:id

module.exports = router;
