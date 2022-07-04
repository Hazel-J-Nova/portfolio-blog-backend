const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "mail.caesura.dev",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "Hazel.Tate@caesura.dev", // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// send mail with defined transport object
const sendEmail = (mailOptions) => {
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  } catch {
    console.log("error");
  }
  return "email sent";
};

exports.sendEmail = sendEmail;
