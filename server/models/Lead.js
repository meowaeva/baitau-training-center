const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Full name must contain at least 2 characters.'],
      maxlength: [60, 'Full name must be no longer than 60 characters.'],
      match: [/^[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s'-]+$/, 'Full name contains invalid characters.']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      match: [/^\+?[0-9\s().-]{7,20}$/, 'Enter a valid phone number.']
    },
    email: {
      type: String,
      required: [true, 'Email is required so the request can be linked to a client account.'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address.']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name is too long.']
    },
    service: {
      type: String,
      required: [true, 'Course or service is required.'],
      trim: true,
      maxlength: [120, 'Course name is too long.']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message must be no longer than 500 characters.']
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'done'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
