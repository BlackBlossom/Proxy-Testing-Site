// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// GET /api/admin/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, admin.role);
    res.json({ token, email: admin.email, name: admin.name});
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/auth/update
// Update the update function to handle password verification
const update = async (req, res, next) => {
  try {
    const {email, name, oldPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // For email changes, verify password
    if (email && email !== admin.email) {
      const isMatch = await admin.comparePassword(oldPassword);
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    }

    admin.email = email || admin.email;
    admin.name = name || admin.name;

    await admin.save();
    res.json(admin);
  } catch (err) {
    next(err);
  }
};



// GET /api/admin/auth/password
const getPassword = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin.passwordHash ? { passwordHash: admin.passwordHash } : { message: 'No password set' });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/auth/update-password
const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }
    admin.passwordHash = newPassword;
    await admin.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/auth/profile
const getAdminProfile = async (req, res, next) => {
  try {
    console.log('Fetching admin with ID:', req.admin._id); // Log the ID
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (!admin) {
      console.log('Admin not found for ID:', req.admin._id);
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json(admin);
  } catch (err) {
    console.error('Profile fetch error:', err); // Log the actual error
    next(err);
  }
};


module.exports = { login, update, getPassword, updatePassword, getAdminProfile };
