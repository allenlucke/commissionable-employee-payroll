
const nodemailer = require('nodemailer');

module.exports = async function(email, firstName, lastName, username, password) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: process.env.FROM, // sender address
        to: email,  // list of receivers
        subject: 'Your user id and password', // Subject line
        text: username, password, // plain text body
        html: `
            <h1>Hello, ${firstName} ${lastName}<h1>
            <p>Welcome to our company. You have been assigned a username
            and password to log into your account.</p>
            <h1>Username: ${username}<h1>
            <h1>Password: ${password}<h1>
            <p>Please log in and change your password by clicking on the
            change password link in the navigation bar.</p>
        ` // html body
    });
    console.log(email)
}