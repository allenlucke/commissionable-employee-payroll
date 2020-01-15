//Admin Router

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
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
//Get Route for Admin Roster Pager
router.get('/roster', (req, res) => {
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
//Get route for Admin All Sales Page
router.get('/allSales', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    if (secLvl > 5 ) {
    const queryString = `SELECT "employees".id, "employees".team_id,
    "employees"."lastName", "employees"."bonusTier", "sales"."transactionNumber",
    "sales".id, "sales"."orderDate", "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id;`;
    pool.query(queryString)
    .then((response) => {
        const newResponse = response.rows.map((item, index) => {
            const calc = (item.modifier*item.pricePerUnit*item.unitsSold)
            // console.log('Old array item: ', item)
            // console.log(calc)
            const newItem = {
                ...item,
                commission: calc
            };
            // console.log('New array item: ', newItem);
            return newItem;
        })
        res.send(newResponse);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;