//Admin Router
//All Admin Routes go here
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
//Delete Router for delete employee on Admin Roster Page
router.delete('/:id', (req, res) => {
    const empID = req.params.id;
    const queryString = `DELETE FROM "employees" WHERE "id" = ${empID};`;
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
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
// Post Route Admin Add Employee Page
router.post('/postEmp', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const position = req.body.position;
    const securityLevel = req.body.securityLevel;
    const hireDate = req.body.hireDate;
    const baseSalary = req.body.baseSalary;
    const team_id = req.body.team_id;
    const queryString = `INSERT INTO "employees" ("firstName", "lastName",
    "userName", "password", "email", "position", "securityLevel", "hireDate",
    "baseSalary", "team_id")
    VALUES('${firstName}', '${lastName}', '${userName}', '${password}', 
    '${email}', '${position}', ${securityLevel}, '${hireDate}', 
    ${baseSalary}, ${team_id});`;
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err)
    })
});

// Admin Get Total Team Sales -- Team Sales Page
router.get('/teamSales', (req, res) => {
    //Querystring for manger/teamNames
    const queryString = `SELECT "employees"."lastName", "teams"."teamName" FROM "employees"
    JOIN "teams" ON "employees".team_id = "teams".id
    WHERE "employees"."securityLevel" =3
    ORDER BY "teams".id ASC;`;
    pool.query(queryString)
    .then((response1) => {
        //Querystring for total products sold and total sales per team
        const queryString = `SELECT "teams"."teamName", SUM("sales_products"."unitsSold") AS "productsSoldPerTeam", SUM("sales_products"."unitsSold"* "products"."pricePerUnit") AS "salesPerTeam", SUM("bonusTier".modifier * "products"."pricePerUnit" * "sales_products"."unitsSold") AS "totalTeamCommissions", AVG("employees"."bonusTier") AS "avgTier" FROM "employees"
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
    })
});
//Get route for Admin Team Sales Page
router.get('/empSales', (req, res) => {
    const userID = req.body.userID;
    const secLvl = req.body.securityLevel;
    if (secLvl > 5 ) {
    const queryString = ``;
    pool.query(queryString)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.sendStatus(500);
    })}
});
module.exports = router;