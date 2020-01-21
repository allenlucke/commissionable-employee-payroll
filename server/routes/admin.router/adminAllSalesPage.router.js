//Admin All Sales Page Router
//All Admin All Sales Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

//Get route for Admin All Sales Page
router.get('/:userSecLvl/:userID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.id;
    const userSecLvl = req.params.userSecLvl;
    const queryString = `SELECT "employees".id AS empID, "employees".team_id,
    "employees"."lastName", "employees"."bonusTier", "sales"."transactionNumber",
    "sales".id AS "salesID", "sales"."orderDate", "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id;`;
    if (userSecLvl >= 10 ) {
    pool.query(queryString)
    .then((response) => {
        const newResponse = response.rows.map((item, index) => {
            const calc = (item.modifier*item.pricePerUnit*item.unitsSold)
            const newItem = {
                ...item,
                commission: calc
            };
            return newItem;
        })
        res.send(newResponse);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;