const sendEnquiryEmail = require('../utils/mailer');

const buildWaLink = () => {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I am interested in Maths Tuition classes by Vimmy Ma'am."
  )}`;
};

const PAGE_TITLE = "Maths Tuition by Vimmy Ma'am – CBSE Classes 10, 11 & 12 | Ambala City";

const allowedClasses = ['10', '11', '12'];
const allowedModes = ['Online', 'Offline'];

const normalizeSpaces = (text = '') => text.replace(/\s+/g, ' ').trim();

const hasLink = (text = '') => {
  const value = text.toLowerCase();
  return (
    /https?:\/\//.test(value) ||
    /www\./.test(value) ||
    /\b(?:[a-z0-9-]+\.)+(com|net|org|ru|xyz|info|biz|top|click|link|shop|site|live|me|cc|io|in)\b/.test(value)
  );
};

exports.getHome = (req, res) => {
  const success = req.query.success === '1';
  const errorType = req.query.error || '';

  const errorMessages = {
    validation: 'Please fill in all fields correctly.',
    name: 'Please enter a valid name.',
    phone: 'Please enter a valid 10-digit phone number.',
    class: 'Please select a valid class.',
    mode: 'Please select a valid mode.',
    message_length: 'Message must be between 10 and 300 characters.',
    message_link: 'Links are not allowed in the enquiry message.',
    message_invalid: 'Invalid characters detected in the message.',
    bot: 'Invalid submission detected.',
    fast: 'Form submitted too quickly. Please try again.',
    rate_limited: 'Too many enquiry attempts. Please try again later.',
    server: 'Something went wrong. Please try again later.'
  };

  res.render('index', {
    pageTitle: PAGE_TITLE,
    waLink: buildWaLink(),
    successMessage: success
      ? 'Thank you! We have received your enquiry. We will contact you shortly.'
      : null,
    errorMessage: errorType ? (errorMessages[errorType] || errorMessages.server) : null
  });
};

exports.postContact = async (req, res) => {
  const name = normalizeSpaces(req.body.name || '');
  const phone = String(req.body.phone || '').replace(/\D/g, '');
  const studentClass = String(req.body.studentClass || '').trim();
  const mode = String(req.body.mode || '').trim();
  const message = String(req.body.message || '').trim();
  const website = String(req.body.website || '').trim();
  const formStartedAt = Number(req.body.formStartedAt || 0);

  if (!name || !phone || !studentClass || !mode || !message) {
    return res.redirect('/?error=validation');
  }

  if (website) {
    return res.redirect('/?error=bot');
  }

  if (!formStartedAt || Number.isNaN(formStartedAt)) {
    return res.redirect('/?error=bot');
  }

  const timeTaken = Date.now() - formStartedAt;
  if (timeTaken < 4000) {
    return res.redirect('/?error=fast');
  }

  if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(name)) {
    return res.redirect('/?error=name');
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return res.redirect('/?error=phone');
  }

  if (!allowedClasses.includes(studentClass)) {
    return res.redirect('/?error=class');
  }

  if (!allowedModes.includes(mode)) {
    return res.redirect('/?error=mode');
  }

  if (message.length < 10 || message.length > 300) {
    return res.redirect('/?error=message_length');
  }

  if (hasLink(message)) {
    return res.redirect('/?error=message_link');
  }

  if (/<[^>]*>/.test(message)) {
    return res.redirect('/?error=message_invalid');
  }

  try {
    await sendEnquiryEmail({
      name,
      phone,
      studentClass,
      mode,
      message
    });

    return res.redirect('/?success=1');
  } catch (err) {
    console.error('Email error:', err.message);
    return res.redirect('/?error=server');
  }
};