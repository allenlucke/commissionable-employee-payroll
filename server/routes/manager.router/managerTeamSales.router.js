//Manager All Sales Router
//All Manager Team Sales Router go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

//Get route for Total Team Sales - Manager Team Page
router.get('/', rejectUnauthenticated, (req, res) => {
    const userID = req.body.userID;
    const teamsID = req.body.teamsID;
    const userSecLvl = req.body.userSecurityLevel;
    //Querystring for total products sold and total sales by team
    const queryString = `SELECT SUM("sales_products"."unitsSold") AS "productsSoldPerTeam", SUM("sales_products"."unitsSold"* "products"."pricePerUnit") AS "salesPerTeam", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") AS "totalTeamCommissions", AVG("employees"."bonusTier") AS "avgTier" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "teams".id = ${teamsID}`;
    if (userSecLvl >= 5 ) {
    pool.query(queryString)
    .then((response1) => {
        //Querystring for amount of individual products sold by team
        const queryString = `SELECT "products"."productName", "products".id AS "productID", SUM("sales_products"."unitsSold") AS "productsSold" FROM "employees"
        JOIN "teams" ON "employees".team_id = "teams".id
        JOIN "sales" ON "employees".id = "sales".employees_id
        JOIN "sales_products" ON "sales".id = "sales_products".sales_id
        JOIN "products" ON "sales_products".product_id = "products".id
        WHERE "teams".id = ${teamsID}
        GROUP BY "products"."productName", "products".id;`;
        pool.query(queryString)
        .then((response2) => {
            res.send({
                teamSalesTotal: response1.rows,
                teamIndividualProductsSold: response2.rows,
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

//Get route for Sales By Employee - Manager Team Sales Page
router.get('/empSales/:userSecLvl/:userID/:teamsID', rejectUnauthenticated, (req, res) => {
    const userID = req.params.userID;
    const teamsID = req.params.teamsID;
    const userSecLvl = req.params.userSecLvl;
    //Querystring for total sales by employees   
    const queryString = `SELECT "employees".id, "employees"."lastName", 
    "employees"."bonusTier", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") 
    AS "totalTeamCommissions", SUM("sales_products"."unitsSold") AS "productsSold", 
    SUM("products"."pricePerUnit" * "sales_products"."unitsSold") AS "total_sales" FROM "employees"
	JOIN "teams" ON "employees".team_id = "teams".id
    JOIN "sales" ON "employees".id = "sales".employees_id
    JOIN "sales_products" ON "sales".id = "sales_products".sales_id
    JOIN "products" ON "sales_products".product_id = "products".id
    JOIN "bonusTier" ON "employees"."bonusTier" = "bonusTier".id
    WHERE "teams".id = ${teamsID}
    GROUP BY "employees".id`;
    if (userSecLvl >= 5 ) {
    pool.query(queryString)
    .then((responseEmpWithTotalSales) => {
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
        .then((responseEmpSalesByProduct) => {
            const empWithTotalSales = responseEmpWithTotalSales.rows;
            const empSalesByProduct = responseEmpSalesByProduct.rows;
            console.log(responseEmpWithTotalSales.rows)
            console.log(responseEmpSalesByProduct.rows);

            const newEmpDataArray = empWithTotalSales.map((empItem) => {
                const empID = empItem.id;
                // assumed that there will always be only one employee matching
                const empMatchForSalesByProduct = empSalesByProduct.filter((item ) => {
                    return item.employeesID === empID;
                });
                const empData = {
                    ...empItem,
                    products: [
                        ...empMatchForSalesByProduct
                    ]
                };
                return empData;
            });

            console.log('n---------------------n', newEmpDataArray);

            res.send(newEmpDataArray)
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