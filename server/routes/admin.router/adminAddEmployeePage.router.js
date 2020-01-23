//Admin Roster Page Router
//All Admin Roster Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const mail = require('./../../modules/mailer');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');
const encryptLib = require('./../../modules/encryption');
const userStrategy = require('./../../strategies/user.strategy');

// Post Route Admin Add Employee Page
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body.userSecurityLevel)
    const userID = req.body.userID;
    const userSecLvl = req.body.userSecurityLevel;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const assignedPassword = req.body.password;
    const password = encryptLib.encryptPassword(req.body.password);
    const email = req.body.email;
    const position = req.body.position;
    const securityLevel = req.body.securityLevel;
    const hireDate = req.body.hireDate;
    const baseSalary = req.body.baseSalary;
    const team_id = req.body.team_id;
    const queryString = `INSERT INTO "employees" ("firstName", "lastName",
    "username", "password", "email", "position", "securityLevel", "hireDate",
    "baseSalary", "team_id")
    VALUES('${firstName}', '${lastName}', '${username}', '${password}', 
    '${email}', '${position}', ${securityLevel}, '${hireDate}', 
    ${baseSalary}, ${team_id});`;
    if(userSecLvl >= 10) {
    mail(email, firstName, lastName, username, assignedPassword)
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err)
    })}
});

module.exports = router;