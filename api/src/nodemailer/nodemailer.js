const nodemailer = require("nodemailer");
const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
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