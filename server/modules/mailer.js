
const nodemailer = require('nodemailer');

module.exports = async function(email, firstName, lastName, username, assignedPassword) {

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
        text: username, assignedPassword, // plain text body
        html: `
            <h1>Hello, ${firstName} ${lastName}<h1>
            <p>Welcome to our company. You have been assigned a username
            and password to log into your account.</p>
            <h1>Username: ${username}<h1>
            <h1>Password: ${assignedPassword}<h1>
            <a href=${process.env.LINK_TO_LOGIN}>Log In</a>
            <p>Please log in and change your password by clicking on the
            change password link in the navigation bar.</p>
        ` // html body
    });
    console.log(email)
}

// https://commissionable-payroll-app.herokuapp.com/