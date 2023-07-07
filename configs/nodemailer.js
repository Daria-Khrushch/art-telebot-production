import nodemailer from "nodemailer";
// import { google } from "googleapis";
// const OAuth2 = google.auth.OAuth2

const email = process.env.EMAIL;
const emailTo = process.env.EMAIL_TWO;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
  port: 587,
  secure: false,
});

export const mailOptions = {
  from: email,
  to: emailTo,
};
