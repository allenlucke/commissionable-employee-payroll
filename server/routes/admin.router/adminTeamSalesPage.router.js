//Admin Team Sales Page Router
//All Team Sales Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

// Get Total Team Sales -- Admin Team Sales Page
router.get('/:userSecLvl/:userID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.id;
    const userSecLvl = req.params.userSecLvl;
    //Querystring for manger/teamNames
    const queryString = `SELECT "employees"."lastName","employees".team_id, "teams"."teamName" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    WHERE "employees"."securityLevel" =5
    ORDER BY "teams".id ASC;`;
    if (userSecLvl >= 10 ) {
    pool.query(queryString)
    .then((response1) => {
        //Querystring for total products sold and total sales per team
        const queryString = `SELECT "teams"."teamName", SUM("sales_products"."unitsSold")
        AS "productsSoldPerTeam", SUM("sales_products"."unitsSold"* "products"."pricePerUnit")
        AS "salesPerTeam", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold")
        AS "totalTeamCommissions", AVG("employees"."bonusTier") AS "avgTier" FROM "employees"
        JOIN "teams" ON "employees".team_id = "teams".id
        JOIN "sales" ON "employees".id = "sales".employees_id
        JOIN "sales_products" ON "sales".id = "sales_products".sales_id
        JOIN "products" ON "sales_products".product_id = "products".id
        JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
        GROUP BY "teams".id
        ORDER BY "teams".id ASC;`;
        pool.query(queryString)
        .then((response2) => {
            //Querystring for amount of products sold by individual teams
            const queryString = `SELECT "teams".id AS "teamID", "products"."productName", "products".id AS "productID", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
            JOIN "teams" ON "employees".team_id = "teams".id
            JOIN "sales" ON "employees".id = "sales".employees_id
            JOIN "sales_products" ON "sales".id = "sales_products".sales_id
            JOIN "products" ON "sales_products".product_id = "products".id
            GROUP BY "teams".id, "products"."productName", "products".id
            ORDER BY "teams".id ASC;`;
            pool.query(queryString)
            .then((response3) => {
                res.send({
                    teamNameManager: response1.rows,
                    teamSalesTotal: response2.rows,
                    teamIDIndividualProductsSold: response3.rows,
                })
            })   
            .catch((err) => {
                res.sendStatus(500);
            })
        })   
        .catch((err) => {
            res.sendStatus(500);
        })
    })   
    .catch((err) => {
        res.sendStatus(500);
    })}
});

//Get route for Sales By Employee - Admin Team Sales Page
router.get('/empSales/:userSecLvl/:userID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.id;
    const userSecLvl = req.params.userSecLvl;
    //Querystring for total sales by employees   
    const queryString = `SELECT "employees".id, "employees"."lastName", "employees"."bonusTier", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") AS "totalTeamCommissions", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    GROUP BY "employees".id
    ORDER BY "employees".id;`;
    if (userSecLvl >= 10 ) {
    pool.query(queryString)
    .then((response1) => {
        //Querystring for total sales by employee by product
        const queryString = `SELECT "employees".id AS "employeesID", "products"."productName", "products".id AS "productID", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
        JOIN "sales" ON "employees".id = "sales".employees_id
        JOIN "sales_products" ON "sales".id = "sales_products".sales_id
        JOIN "products" ON "sales_products".product_id = "products".id
        GROUP BY "products"."productName", "products".id, "employees".id
        ORDER BY "employees".id ASC;`;
        pool.query(queryString)
        .then((response2) => {
            res.send({
                salesByEmployee: response1.rows,
                salesByProduct: response2.rows,
            })
        })    
        .catch((err) => {
            res.sendStatus(500);
        })  
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});

module.exports = router;