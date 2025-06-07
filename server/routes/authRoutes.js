// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, update, getPassword, updatePassword, getAdminProfile } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');

// POST /api/admin/auth/login
router.post('/login', login);

router.use(protectAdmin); // Protect all routes in this file

// GET /api/admin/auth/profile
router.get('/profile', getAdminProfile);

// PUT /api/admin/auth/update
router.put('/update', update);

// PUT /api/admin/auth/password
router.get('/password', getPassword);

// PUT /api/admin/auth/update-password
router.put('/update-password', updatePassword);


module.exports = router;
