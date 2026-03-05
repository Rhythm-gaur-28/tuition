const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEnquiryEmail = async ({ name, phone, studentClass, mode, message }) => {
  const mailOptions = {
    from: `"Maths Tuition – Vimmy Ma'am" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Enquiry – ${name} | Class ${studentClass} | ${mode}`,
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
              <td style="padding: 10px 0; color: #2e2e2e;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Phone</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">
                <a href="tel:${phone}" style="color: #3a4f9a; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Class</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">Class ${studentClass}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Mode</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">${mode}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888; vertical-align: top;">
                <strong>Message</strong>
              </td>
              <td style="padding: 10px 0; color: #2e2e2e;">
                ${message && message.trim() ? message.trim() : '<em style="color:#aaa;">No message provided</em>'}
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
