//Admin Roster Page Router
//All Admin Roster Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

//Get Route for Admin Roster Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    if (secLvl > 5 ) {
    const queryString = `SELECT "employees".id, "employees"."firstName", "employees"."lastName", "employees".position, "employees"."securityLevel", "employees"."hireDate", "employees"."baseSalary", "employees".team_id,"teams"."teamName" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    ORDER BY "employees".id ASC;`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
    }
});
//Delete Router for delete employee on Admin Roster Page
router.delete('/:id', (req, res) => {
    const empID = req.params.id;
    const queryString = `DELETE FROM "employees" WHERE "id" = ${empID};`;
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = router;
