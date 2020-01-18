//Salesperson View Sales/Commissions Router
//All Salesperson View Sales/Commissions Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

//Get route for Salesperson View Sales/Commissions Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    const queryString = `SELECT "employees".id, "employees"."bonusTier", 
    "sales"."transactionNumber", "sales".id AS "salesID", "sales"."orderDate", 
    "products"."productName", "sales_products"."unitsSold",
    "products"."costPerUnit", "products"."pricePerUnit", 
    SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") 
    AS "estCommission" FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "employees".id = ${userID}
    GROUP BY "employees".id, "sales"."transactionNumber", "sales".id, "products"."productName", 
    "sales_products"."unitsSold", "products"."costPerUnit", "products"."pricePerUnit", "bonusTier".modifier;
    `;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = router;