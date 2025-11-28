import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // For development: Use Ethereal email (fake SMTP)
    // For production: Configure with SendGrid, AWS SES, etc.
    if (process.env.NODE_ENV === 'production' && process.env.SENDGRID_API_KEY) {
      // Production email setup (SendGrid example)
      this.transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    } else {
      // Development: Log emails to console
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      });
    }
  }

  /**
   * Generate verification token
   */
  generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Send email verification
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@boxbee.app',
      to: email,
      subject: '🐝 Verify your BoxBee email',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button {
                display: inline-block;
                background: #F5A623;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
              }
              .footer { margin-top: 40px; color: #6B6B6B; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🐝 Welcome to BoxBee!</h1>
              <p>Thanks for signing up! Please verify your email address to get started.</p>
              <p>
                <a href="${verificationUrl}" class="button">Verify Email</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p style="color: #6B6B6B; word-break: break-all;">${verificationUrl}</p>
              <div class="footer">
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create a BoxBee account, you can safely ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      if (process.env.NODE_ENV !== 'production') {
        console.log('\n📧 Email Verification Link:');
        console.log(verificationUrl);
        console.log('---\n');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  /**
   * Send password reset email (future implementation)
   */
  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // TODO: Implement in future sprint
    console.log('Password reset email would be sent to:', email);
  }
}

export default new EmailService();
