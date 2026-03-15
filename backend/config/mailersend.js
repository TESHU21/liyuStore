import { MailerSend, EmailParams, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendOtpEmail = async (email, otp) => {
  try {
    const emailParams = new EmailParams()
      .setFrom(process.env.MAILERSEND_FROM_EMAIL)
      .setTo([new Recipient(email, "Dear User")])
      .setSubject("🔐 Password Reset OTP - Liyu Store").setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset OTP - Liyu Store</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #007bff;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #007bff;
              margin-bottom: 10px;
            }
            .otp-container {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
              border: 2px dashed #007bff;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #007bff;
              letter-spacing: 8px;
              margin: 10px 0;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              color: #6c757d;
              font-size: 14px;
            }
            .security-note {
              background-color: #d1ecf1;
              border: 1px solid #bee5eb;
              color: #0c5460;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛍️ Liyu Store</div>
              <h1>Password Reset Request</h1>
            </div>
            
            <p>Hello,</p>
            <p>We received a request to reset your password for your Liyu Store account. Use the OTP code below to proceed with the password reset:</p>
            
            <div class="otp-container">
              <p><strong>Your OTP Code:</strong></p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This OTP will expire in <strong>5 minutes</strong> for your security.
            </div>
            
            <div class="security-note">
              <strong>🔒 Security Notice:</strong><br>
              • Never share this OTP with anyone<br>
              • Our team will never ask for your OTP<br>
              • If you didn't request this, please ignore this email
            </div>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your account remains secure.</p>
            
            <div class="footer">
              <p><strong>Need Help?</strong></p>
              <p>Contact our support team if you have any questions or concerns.</p>
              <p>© 2026 Liyu Store. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `).setText(`
        Liyu Store - Password Reset OTP
        
        Hello,
        
        We received a request to reset your password for your Liyu Store account.
        
        Your OTP code is: ${otp}
        
        This OTP will expire in 5 minutes.
        
        Security Notice:
        - Never share this OTP with anyone
        - Our team will never ask for your OTP
        - If you didn't request this, please ignore this email
        
        If you didn't request a password reset, you can safely ignore this email.
        
        2026 Liyu Store. All rights reserved.
      `);

    const response = await mailerSend.email.send(emailParams);
    console.log("OTP email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
