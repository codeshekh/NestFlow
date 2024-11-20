import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f7f7f7;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          You requested an OTP code to proceed with your authentication. Please use the following OTP code:
        </p>
        <div style="background-color: #f1f1f1; border: 1px solid #ccc; padding: 15px; font-size: 20px; font-weight: bold; color: #333;">
          ${otp}
        </div>
        <p style="font-size: 16px; line-height: 1.5;">
          <strong>Note:</strong> This code will expire in 10 minutes. Please do not share it with anyone.
        </p>
        <p style="font-size: 14px; color: #888;">
          If you did not request this, please ignore this email.
        </p>
        <footer style="font-size: 12px; color: #888;">
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`, // Fallback text for clients not supporting HTML
        html: htmlContent, // HTML content for better styling
      });

      console.log(`OTP sent successfully to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP email');
    }
  }
}
