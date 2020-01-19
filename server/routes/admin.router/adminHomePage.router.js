//Admin Home Page Router
//All Admin Home Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

// Get route for Admin Home Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    const queryString = `SELECT "firstName", "lastName" FROM "employees"
                        WHERE "employees".id = ${userID} AND ${secLvl} > 5;`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = router;