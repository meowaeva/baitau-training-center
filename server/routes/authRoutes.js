const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const publicUser = user => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  activeCourses: user.activeCourses || []
});

router.post(
  '/register',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 60 })
      .withMessage('Full name must be from 2 to 60 characters.')
      .matches(/^[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s'-]+$/)
      .withMessage('Full name may contain letters, spaces, hyphens and apostrophes only.'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email address.')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 50 })
      .withMessage('Password must be from 8 to 50 characters.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter.')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one number.')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      }

      const user = await User.create({ name, email, password, role: 'user', activeCourses: [] });
      const token = createToken(user._id);

      res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        token,
        user: publicUser(user)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Registration failed.' });
    }
  }
);

router.post(
  '/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email address.')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Incorrect email or password.' });
      }

      const token = createToken(user._id);

      res.json({
        success: true,
        message: 'Logged in successfully.',
        token,
        user: publicUser(user)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Login failed.' });
    }
  }
);

router.get('/me', protect, (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});

module.exports = router;
