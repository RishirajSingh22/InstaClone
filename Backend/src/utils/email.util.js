import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  
  secure: process.env.SMTP_SECURE||"true" , // boolean
  auth: {
    user: process.env.SMTP_USER||"chouhanrishi22@gmail.com",
    pass: process.env.SMTP_PASS||"ckil mfnj oioj vjam",
  },
});

/**
 * Sends an email-verification link to the user.
 * @param {string} to       Recipient email
 * @param {string} token    Verification token
 */
export const sendVerificationEmail = async (to, token) => {
    
  const verifyURL = `${process.env.FRONTEND_BASE_URL}/verify-email/${token}`;
  await transporter.sendMail({
    from: `"No-Reply" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyURL}">${verifyURL}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
};

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"No-Reply" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <h2>Your One-Time Password</h2>
      <p>Your OTP code is: <b>${otp}</b></p>
      <p>The code is valid for 5 minutes.</p>
    `,
  });
};