import nodemailer from 'nodemailer'
import env from 'dotenv'
env.config()
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GPASS,
  },
});

export async function nodeMailer(otp,receiverMail) {
  const info = await transporter.sendMail({
    from: process.env.GMAIL,
    to: receiverMail, 
    subject: "OTP for KK-ChatApp", 
    text: `Your OTP :${otp} `, 
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
