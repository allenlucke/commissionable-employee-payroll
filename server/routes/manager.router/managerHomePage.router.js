//Manager HomePage Router
//All Manager HomePage Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

// Get route for Manager Home Page
router.get('/:userSecLvl/:userID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.userID;
    const userSecLvl = req.params.userSecLvl;
    const queryString = `SELECT "firstName", "lastName", 
    "teams"."teamName", "teams".id AS "teamsID" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    WHERE "employees".id = ${userID};`;
    if (userSecLvl >= 5) {
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;