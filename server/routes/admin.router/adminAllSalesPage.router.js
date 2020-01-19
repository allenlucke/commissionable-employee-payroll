//Admin All Sales Page Router
//All Admin All Sales Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

//Get route for Admin All Sales Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    if (secLvl > 5 ) {
    const queryString = `SELECT "employees".id AS empID, "employees".team_id,
    "employees"."lastName", "employees"."bonusTier", "sales"."transactionNumber",
    "sales".id AS "salesID", "sales"."orderDate", "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id;`;
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