
const nodemailer = require('nodemailer');

module.exports = async function(email, userName, password) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: process.env.FROM, // sender address
        // to: email,
        // to: "`${email}`",
        // to: process.env.TO, // list of receivers
        subject: 'Your user id and password', // Subject line
        text: userName, password, // plain text body
        html: `
            <h1>${userName}<h1>
            <h1>${password}<ha>
        ` // html body
    });
}