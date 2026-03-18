import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY,
});

const sentFrom = new Sender("auth@teshomemosneh.com", "Teshome Auth");

export const sendOtpEmail = async (email, otp) => {
  try {
    const recipients = [new Recipient(email, "Dear User")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("🔐 Password Reset OTP - Liyu Store").setHtml(`
        <h2>Password Reset</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `).setText(`
        Liyu Store - Password Reset OTP
        
        Your OTP code is: ${otp}
        
        This OTP expires in 5 minutes.
        Dont share this code with anyone.and Dont reply to this email.
      `);

    const response = await mailerSend.email.send(emailParams);

    return response;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
