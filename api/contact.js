import nodemailer from 'nodemailer';

// Prevent verbose logs in production
const isProd = process.env.NODE_ENV === 'production';

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM_EMAIL',
  'SMTP_FROM_NAME',
  'CONTACT_RECIPIENT_EMAIL',
];

function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing SMTP env vars: ${missing.join(', ')}`);
  }
}

function createTransporter() {
  validateEnv();
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function validatePayload(body) {
  const { name, email, subject, message } = body || {};
  if (!name || !email || !subject || !message) {
    return 'All fields are required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters long';
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const validationError = validatePayload(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { name, email, subject, message } = req.body;
    const transporter = createTransporter();

    const adminMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      text: `From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #fff; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 2px solid #e0e0e0; margin: 25px 0;" />
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    const visitorMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Thank you for reaching out!',
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will reply soon.\n\nYour message:\n${message}\n\n— ${process.env.SMTP_FROM_NAME}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #fff; margin: 0;">Thank you, ${name}!</h2>
          </div>
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="color: #333; font-size: 16px;">Thanks for getting in touch! I've received your message and will get back to you soon.</p>
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 14px;"><strong>Your Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
            </div>
            <p style="color: #666; font-size: 15px; margin: 20px 0;">I typically respond within 24-48 hours.</p>
            <p style="color: #333; margin-top: 30px;">Best regards,<br><strong style="font-size: 18px;">${process.env.SMTP_FROM_NAME}</strong></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(visitorMailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully! I will get back to you soon.' });
  } catch (error) {
    if (!isProd) {
      console.error('Email error:', error.message);
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: isProd ? undefined : error.message,
    });
  }
}
