const Contact = require('../models/Contact');

const waLink = () => {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello, I am interested in CBSE tuition classes at Ambala Academic Classes.'
  )}`;
};

const pageTitle = 'Ambala Academic Classes - CBSE Tuition for Classes 1–12';

// GET home page
exports.getHome = (req, res) => {
  const success = req.query.success === '1';
  const error = req.query.error === '1';

  res.render('index', {
    pageTitle,
    waLink: waLink(),
    successMessage: success
      ? 'Thank you! We have received your enquiry. We will contact you shortly.'
      : null,
    errorMessage: error
      ? 'Something went wrong. Please try again later.'
      : null
  });
};

// POST contact form
exports.postContact = async (req, res) => {
  const { name, phone, studentClass, message } = req.body;

  if (!name || !phone || !studentClass) {
    // ✅ No #contact hash — JS handles scrolling
    return res.redirect('/?error=validation');
  }

  try {
    await Contact.create({ name, phone, studentClass, message });
    // ✅ PRG pattern — no #contact hash
    res.redirect('/?success=1');
  } catch (err) {
    console.error('Error saving contact:', err.message);
    res.redirect('/?error=1');
  }
};
