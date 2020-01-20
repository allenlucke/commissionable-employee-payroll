//Admin Home Page Router
//All Admin Home Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');
// const encryptLib = require('./../../modules/encryption');
// const userStrategy = require('./../../strategies/user.strategy');

// Get route for Admin Home Page
router.get('/', rejectUnauthenticated, (req, res) => {
    const userID = req.body.userID;
    const userSecLvl = req.body.userSecurityLevel;
    const queryString = `SELECT "firstName", "lastName" FROM "employees"
                        WHERE "employees".id = ${userID} AND ${userSecLvl} >= 10;`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = router;