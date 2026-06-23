const express = require('express');
const { body, param } = require('express-validator');
const Service = require('../models/Service');
const validateRequest = require('../middleware/validateRequest');
const { protect, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    const services = await Service.find(filter).sort({ isPopular: -1, title: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load services.' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load categories.' });
  }
});

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid service ID.')],
  validateRequest,
  async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }

      res.json({ success: true, data: service });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Could not load service.' });
    }
  }
);

router.post(
  '/',
  protect,
  allowRoles('admin'),
  [
    body('title')
      .trim()
      .isLength({ min: 3, max: 120 })
      .withMessage('Service title must be from 3 to 120 characters.'),
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required.'),
    body('description')
      .trim()
      .isLength({ min: 20, max: 1500 })
      .withMessage('Description must be from 20 to 1500 characters.'),
    body('duration')
      .trim()
      .notEmpty()
      .withMessage('Duration is required.'),
    body('format')
      .trim()
      .notEmpty()
      .withMessage('Training format is required.'),
    body('level')
      .optional()
      .isIn(['Introductory', 'Intermediate', 'Advanced', 'Corporate'])
      .withMessage('Invalid service level.')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const service = await Service.create(req.body);
      res.status(201).json({ success: true, message: 'Service created.', data: service });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Could not create service.' });
    }
  }
);

module.exports = router;
