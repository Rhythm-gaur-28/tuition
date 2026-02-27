const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    studentClass: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000
    }
  },
  { timestamps: true }
); // similar to typical contact form schemas for Express/MongoDB apps [web:3][web:13]

module.exports = mongoose.model('Contact', contactSchema);
