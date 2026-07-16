const nodemailer = require('nodemailer');

const EMAIL_USER = (process.env.EMAIL_USER || '').trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || '').trim();
const EMAIL_TO = (process.env.EMAIL_TO || '').trim();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sendEnquiryEmail = async ({ name, phone, studentClass, mode, message }) => {
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeClass = escapeHtml(studentClass);
  const safeMode = escapeHtml(mode);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const mailOptions = {
    from: `"Maths Tuition – Vimmy Ma'am" <${EMAIL_USER}>`,
    to: EMAIL_TO,
    subject: `New Enquiry – ${safeName} | Class ${safeClass} | ${safeMode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: #3a4f9a; padding: 20px 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Student Enquiry</h2>
          <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0; font-size: 13px;">
            Received via Maths Tuition by Vimmy Ma'am website
          </p>
        </div>

        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #888; width: 130px; vertical-align: top;">
                <strong>Name</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">${safeName}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Phone</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">
                <a href="tel:${safePhone}" style="color: #3a4f9a; text-decoration: none;">${safePhone}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Class</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">Class ${safeClass}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Mode</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">${safeMode}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Message</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">
                ${safeMessage || '<em style="color:#aaa;">No message provided</em>'}
              </td>
            </tr>
          </table>
        </div>

        <div style="background: #f7f5ef; padding: 14px 24px; text-align: center; border-top: 1px solid #ececec;">
          <p style="margin: 0; font-size: 12px; color: #aaa;">
            Maths Tuition by Vimmy Ma'am – Auto Notification | Do not reply to this email
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEnquiryEmail;