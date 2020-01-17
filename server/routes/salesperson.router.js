//Salesperson Router
//All Salesperson Routes go here
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get route for Salesperson Home Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    const queryString = `SELECT "firstName", "lastName", 
    "teams"."teamName", "teams".id AS "teamsID" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    WHERE "employees".id = ${userID};`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});
//Get route for Salesperson View Sales/Commissions Page
router.get('/sales', (req, res) => {
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
// Post Route for Salesperson Add Sales Page
router.post('/addSale', (req, res) => {
    const userID = req.body.userID;
    const bonusTier = req.body.bonusTier;
    const date = req.body.date;
    const transactionNumber = req.body.transactionNumber;
    const product_id = req.body.product_id;
    const unitsSold = req.body.unitsSold;
    const queryString = `INSERT INTO "sales" ("employees_id", "orderDate", "transactionNumber")
    VALUES (${userID}, '${date}', '${transactionNumber}') RETURNING id;`;
    pool.query(queryString)
    .then((response) => {
        console.log(response.rows.map((item, index) => {
            return item.id;
        }))
        res.send(response.rows.map((item, index) => {
            return newSalesId = item.id;
        }))
        console.log(newSalesId)
        const queryString = `INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
        VALUES (${newSalesId}, ${product_id}, ${unitsSold});`;
        pool.query(queryString)
        .then((response2) => {
            // res.sendStatus(201)
            
            pool.query(queryString)
            .then((response3) => {

            })
            .catch((err) => {
                res.sendStatus(500);
            })
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err)
        })
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err)
    })
});

module.exports = router;