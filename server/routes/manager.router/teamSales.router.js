//Manager All Sales Router
//All Manager Team Sales Router go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

//Get route for Total Team Sales Manager Team Page
router.get('/', (req, res) => {
    const userID = req.body.userID;
    const teamsID = req.body.teamsID;
    const secLvl = req.body.securityLevel;
    const queryString = ``;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

//Get route for Sales By Employee - Manager Team Sales Page
router.get('/empSales', (req, res) => {
    const userID = req.body.userID;
    const teamsID = req.body.teamsID;
    const secLvl = req.body.securityLevel;
    //Querystring for total sales by employees   
    const queryString = `SELECT "employees".id, "employees"."lastName", "employees"."bonusTier", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") AS "totalTeamCommissions", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
	JOIN "teams" ON "employees".team_id = "teams".id
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "teams".id = ${teamsID}
    GROUP BY "employees".id`;
    pool.query(queryString)
    .then((response1) => {
        //Querystring for total sales by employee by product
        const queryString = `SELECT "employees".id AS "employeesID", "products"."productName", "products".id AS "productID", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
		JOIN "teams" ON "employees".team_id = "teams".id
        JOIN "sales" ON "employees".id = "sales".employees_id
        JOIN "sales_products" ON "sales".id = "sales_products".sales_id
        JOIN "products" ON "sales_products".product_id = "products".id
        WHERE "teams".id = ${teamsID}
        GROUP BY "products"."productName", "products".id, "employees".id
        ORDER BY "employees".id ASC; `;
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
    })
});

module.exports = router;