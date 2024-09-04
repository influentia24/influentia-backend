const nodemailer = require('nodemailer');

const yourEmail = process.env.YOUR_EMAIL 

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});




module.exports = { transporter, yourEmail };
