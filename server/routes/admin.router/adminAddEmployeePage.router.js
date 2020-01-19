//Admin Roster Page Router
//All Admin Roster Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const mail = require('./../../modules/mailer');

// Post Route Admin Add Employee Page
router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const position = req.body.position;
    const securityLevel = req.body.securityLevel;
    const hireDate = req.body.hireDate;
    const baseSalary = req.body.baseSalary;
    const team_id = req.body.team_id;
    const queryString = `INSERT INTO "employees" ("firstName", "lastName",
    "userName", "password", "email", "position", "securityLevel", "hireDate",
    "baseSalary", "team_id")
    VALUES('${firstName}', '${lastName}', '${userName}', '${password}', 
    '${email}', '${position}', ${securityLevel}, '${hireDate}', 
    ${baseSalary}, ${team_id});`;
    mail(email, firstName, lastName, userName, password)
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err)
    })
});

module.exports = router;