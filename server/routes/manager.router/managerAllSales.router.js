//Manager All Sales Router
//All Manager All Sales Router go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

//Get route for Manager All Sales Page
router.get('/', rejectUnauthenticated, (req, res) => {
    const userID = req.body.userID;
    const teamsID = req.body.teamsID;
    const userSecLvl = req.body.userSecurityLevel;
    const queryString = `SELECT "employees".id, "employees"."lastName", "employees"."bonusTier", 
    "sales"."transactionNumber", "sales".id AS "salesID", "sales"."orderDate", 
    "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", 
    SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") 
    AS "estCommission" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "teams".id = ${teamsID}
    GROUP BY "employees".id, "sales"."transactionNumber", "sales".id, "products"."productName", 
    "sales_products"."unitsSold", "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier
    ORDER BY "sales".id;`;
    if (userSecLvl >= 5 ) {
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;