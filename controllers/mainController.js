const sendEnquiryEmail = require('../utils/mailer');

const buildWaLink = () => {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello, I am interested in CBSE tuition classes at Ambala Academic Classes.'
  )}`;
};

const PAGE_TITLE = 'Ambala Academic Classes - CBSE Tuition for Classes 1–12';

// GET home page
exports.getHome = (req, res) => {
  const success = req.query.success === '1';
  const error = req.query.error === '1';

  res.render('index', {
    pageTitle: PAGE_TITLE,
    waLink: buildWaLink(),
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

  // All fields including message are required
  if (
    !name || !name.trim() ||
    !phone || !phone.trim() ||
    !studentClass ||
    !message || !message.trim()
  ) {
    return res.redirect('/?error=validation');
  }

  try {
    await sendEnquiryEmail({ name: name.trim(), phone: phone.trim(), studentClass, message: message.trim() });
    res.redirect('/?success=1');
  } catch (err) {
    console.error('Email error:', err.message);
    res.redirect('/?error=1');
  }
};
