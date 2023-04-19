const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
    console.log("conectado y listo para enviar notificaciones");
  }).catch((err) => {
    console.log(err.message);
  });
module.exports = {
    transporter
};