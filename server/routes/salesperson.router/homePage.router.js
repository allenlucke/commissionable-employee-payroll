//Salesperson HomePage Router
//All Salesperson HomePage Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

// Get route for Salesperson Home Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    const queryString = `SELECT "firstName", "lastName", 
    "teams"."teamName", "teams".id AS "teamsID" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    WHERE "employees".id = ${userID};`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = router;