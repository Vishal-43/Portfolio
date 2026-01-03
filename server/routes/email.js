import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '..', '.env.local');

// Load environment variables from .env.local (or .env as fallback)
dotenv.config({ path: envPath });
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

/**
 * Create SMTP Transporter with credentials from .env
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: (process.env.SMTP_PORT === '465'), // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log('🔧 SMTP Configuration:');
console.log(`   Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
console.log(`   Port: ${process.env.SMTP_PORT || 587}`);
console.log(`   User: ${process.env.SMTP_USER ? '✓ Set' : '✗ Not set'}`);
console.log(`   Pass: ${process.env.SMTP_PASS ? '✓ Set' : '✗ Not set'}`);

/**
 * Verify transporter connection (test SMTP credentials)
 */
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Configuration Error:', error.message);
    console.error('   Reason: Check that your app password is correct and has spaces');
    console.error('   Gmail app passwords should be: XXXX XXXX XXXX XXXX (with spaces)');
  } else {
    console.log('✅ SMTP Server Connected and Ready for Sending Emails');
  }
});

/**
 * Send Contact Form Email
 */
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate message length
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long',
      });
    }

    /**
     * Email to YOU (admin)
     * You receive this when someone submits the form
     */
    const adminMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #fff; margin: 0;">📨 New Contact Form Submission</h2>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #666;"><strong style="color: #333;">From:</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #333;">${name}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #666;"><strong style="color: #333;">Email:</strong></p>
              <p style="margin: 5px 0 0 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #666;"><strong style="color: #333;">Subject:</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #333;">${subject}</p>
            </div>

            <hr style="border: none; border-top: 2px solid #e0e0e0; margin: 25px 0;">

            <div>
              <p style="margin: 0 0 10px 0; color: #666;"><strong style="color: #333;">Message:</strong></p>
              <div style="background-color: #fff; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">This email was sent from your portfolio website contact form.</p>
            <p style="margin: 5px 0 0 0;">Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio website contact form.
      `,
    };

    /**
     * Confirmation Email to VISITOR
     * They receive this confirming their message was received
     */
    const visitorMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: '✅ Thank you for reaching out!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #fff; margin: 0;">✅ Thank You, ${name}!</h2>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="color: #333; font-size: 16px;">Thanks for getting in touch! I've received your message and will get back to you as soon as possible.</p>

            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 14px;"><strong>Your Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
            </div>

            <p style="color: #666; font-size: 15px; margin: 20px 0;">
              ⏱️ <strong>I typically respond within 24-48 hours.</strong>
            </p>

            <p style="color: #333; margin-top: 30px;">
              Best regards,<br>
              <strong style="font-size: 18px;">${process.env.SMTP_FROM_NAME}</strong>
            </p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">This is an automated response. Please don't reply to this email.</p>
            <p style="margin: 5px 0 0 0;">If you have any urgent concerns, you can reach out directly.</p>
          </div>
        </div>
      `,
      text: `
Thank you, ${name}!

Thanks for getting in touch. I've received your message and will get back to you as soon as possible.

Your Message:
${message}

I typically respond within 24-48 hours.

Best regards,
${process.env.SMTP_FROM_NAME}
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    console.log(`✅ Admin email sent for submission from ${email}`);

    await transporter.sendMail(visitorMailOptions);
    console.log(`✅ Visitor confirmation email sent to ${email}`);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Test Email Endpoint
 * Use this to test if SMTP is configured correctly
 */
export const sendTestEmail = async (req, res) => {
  try {
    const testMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: '✅ SMTP Configuration Test - Portfolio',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; text-align: center;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px; color: white;">
            <h2 style="margin: 0; font-size: 24px;">✅ SMTP Configured Successfully!</h2>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your email configuration is working properly.</p>
          </div>
          <p style="margin-top: 20px; color: #666;">
            <strong>Test sent at:</strong> ${new Date().toLocaleString()}<br>
            Your portfolio contact form is ready to receive messages! 🎉
          </p>
        </div>
      `,
    };

    await transporter.sendMail(testMailOptions);
    return res.status(200).json({
      success: true,
      message: '✅ Test email sent successfully! Check your inbox.',
    });
  } catch (error) {
    console.error('❌ Test email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message,
    });
  }
};
