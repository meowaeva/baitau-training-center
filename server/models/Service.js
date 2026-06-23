const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required.'],
      trim: true,
      minlength: [3, 'Service title must contain at least 3 characters.'],
      maxlength: [120, 'Service title is too long.']
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      minlength: [20, 'Description must contain at least 20 characters.']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required.'],
      trim: true
    },
    format: {
      type: String,
      required: [true, 'Training format is required.'],
      trim: true
    },
    level: {
      type: String,
      enum: ['Introductory', 'Intermediate', 'Advanced', 'Corporate'],
      default: 'Corporate'
    },
    tags: [{ type: String, trim: true }],
    isPopular: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
