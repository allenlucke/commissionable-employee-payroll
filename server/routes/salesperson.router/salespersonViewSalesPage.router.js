//Salesperson View Sales/Commissions Router
//All Salesperson View Sales/Commissions Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

//Get route for Salesperson View Sales/Commissions Page
router.get('/:userSecLvl/:userID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.userID;
    const userSecLvl = req.params.userSecLvl;
    const queryString = `SELECT "employees".id, "employees"."bonusTier", 
    "sales"."transactionNumber", "sales".id AS "salesID", "sales"."orderDate", 
    "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", 
    SUM("products"."pricePerUnit" * "sales_products"."unitsSold") AS "extendedPrice",
    SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") 
    AS "estCommission" FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "employees".id = ${userID}
    GROUP BY "employees".id, "sales"."transactionNumber", "sales".id, "products"."productName", 
    "sales_products"."unitsSold", "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier;`;
    if (userSecLvl >= 1) {
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;