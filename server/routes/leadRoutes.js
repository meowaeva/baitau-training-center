const express = require('express');
const { body, param } = require('express-validator');
const Lead = require('../models/Lead');
const Service = require('../models/Service');
const User = require('../models/User');
const validateRequest = require('../middleware/validateRequest');
const { protect, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const leadValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Full name must be from 2 to 60 characters.')
    .matches(/^[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s'-]+$/)
    .withMessage('Full name may contain letters, spaces, hyphens and apostrophes only.'),
  body('phone')
    .trim()
    .matches(/^\+?[0-9\s().-]{7,20}$/)
    .withMessage('Enter a valid phone number.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required so the request can be linked to a client account.')
    .isEmail()
    .withMessage('Enter a valid email address.')
    .normalizeEmail(),
  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be no longer than 100 characters.'),
  body('service')
    .trim()
    .notEmpty()
    .withMessage('Course or service is required.')
    .isLength({ max: 120 })
    .withMessage('Course name is too long.'),
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message must be no longer than 500 characters.')
];

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const syncLeadWithClientCourses = async lead => {
  if (!lead.email) {
    return { linked: false, reason: 'The request has no email address.' };
  }

  const user = await User.findOne({ email: lead.email.toLowerCase() });

  if (!user) {
    return { linked: false, reason: 'No client account uses this request email.' };
  }

  const leadId = lead._id.toString();

  if (lead.status === 'new') {
    user.activeCourses = user.activeCourses.filter(course => String(course.leadId || '') !== leadId);
    await user.save();
    return { linked: true, action: 'removed_from_courses' };
  }

  const service = await Service.findOne({
    title: new RegExp(`^${escapeRegex(lead.service)}$`, 'i')
  });

  const courseStatus = lead.status === 'done' ? 'completed' : 'active';
  const progress = lead.status === 'done' ? 100 : 50;

  const courseData = {
    leadId: lead._id,
    title: service?.title || lead.service,
    category: service?.category || 'Training request',
    description:
      service?.description ||
      lead.message ||
      `Training request for ${lead.service}. The training centre will confirm the programme details.`,
    status: courseStatus,
    progress,
    trainer: 'Baitau Partners training specialist',
    location: 'To be confirmed',
    format: service?.format || 'To be confirmed'
  };

  const existingCourse =
    user.activeCourses.find(course => String(course.leadId || '') === leadId) ||
    user.activeCourses.find(course => course.title.toLowerCase() === courseData.title.toLowerCase());

  if (existingCourse) {
    existingCourse.leadId = courseData.leadId;
    existingCourse.title = courseData.title;
    existingCourse.category = courseData.category;
    existingCourse.description = courseData.description;
    existingCourse.status = courseData.status;
    existingCourse.progress = courseData.progress;
    existingCourse.trainer = courseData.trainer;
    existingCourse.location = courseData.location;
    existingCourse.format = courseData.format;
  } else {
    user.activeCourses.push(courseData);
  }

  await user.save();

  return { linked: true, action: courseStatus === 'completed' ? 'completed_course' : 'activated_course' };
};

router.post('/', leadValidationRules, validateRequest, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Your request has been submitted. We will contact you soon.',
      data: lead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not save the request.' });
  }
});

router.get('/', protect, allowRoles('admin'), async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load requests.' });
  }
});

router.patch(
  '/:id/status',
  protect,
  allowRoles('admin'),
  [
    param('id').isMongoId().withMessage('Invalid request ID.'),
    body('status')
      .isIn(['new', 'in_progress', 'done'])
      .withMessage('Invalid request status.')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );

      if (!lead) {
        return res.status(404).json({ success: false, message: 'Request not found.' });
      }

      const courseSync = await syncLeadWithClientCourses(lead);

      res.json({
        success: true,
        message: courseSync.linked
          ? 'Request status updated and client course list refreshed.'
          : `Request status updated. Course was not linked: ${courseSync.reason}`,
        data: lead,
        courseSync
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Could not update request status.' });
    }
  }
);

module.exports = router;
