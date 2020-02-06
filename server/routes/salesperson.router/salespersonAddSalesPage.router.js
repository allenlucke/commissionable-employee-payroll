//Salesperson Add Sales Page Router
//All Salesperson Add Sales Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');

// Post Route for Salesperson Add Sales Page
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const userSecLvl = req.body.userSecLvl;
    const userID = req.body.userID;
    const date = req.body.date;
    const transactionNumber = req.body.transactionNumber;
    const product_id = req.body.product_id;
    const unitsSold = req.body.unitsSold;
    //Posts to sales table
    const queryString = `INSERT INTO "sales" ("employees_id", "orderDate", "transactionNumber")
    VALUES (${userID}, '${date}', '${transactionNumber}') RETURNING id;`;
    if (userSecLvl >= 1) {
    pool.query(queryString)
    .then((response) => {
        console.log(response.rows.map((item, index) => {
            return item.id;
        }))
        response.rows.map((item, index) => {
            return newSalesId = item.id;
        })
        console.log(newSalesId)
        //Posts to sales_products table
        const queryString = `INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
        VALUES (${newSalesId}, ${product_id}, ${unitsSold});`;
        pool.query(queryString)
        .then((response2) => {
            //Get for salespersons updated sales total and current bonus tier
            const queryString = `SELECT "employees".id, "employees"."bonusTier", 
            SUM("sales_products"."unitsSold") AS "totalProductsSold" FROM "employees"
            JOIN "sales" ON "employees".id = "sales".employees_id
            JOIN "sales_products" ON "sales".id = "sales_products".sales_id
            WHERE "employees".id = ${userID}
            GROUP BY "employees".id;`;
            pool.query(queryString)
            .then((response3) => {
                console.log(response3.rows)
                //updated total products sold
                response3.rows.map((item, index) => {
                    return totalProductsSold = item.totalProductsSold;
                })
                //employees current bonus tier
                response3.rows.map((item, index) => {
                    return empBonusTier = item.bonusTier;
                })
                console.log(empBonusTier)
                console.log(totalProductsSold)
                //Get for bonus qualifiers and modifiers
                const queryString = `SELECT * FROM "bonusTier"`;
                pool.query(queryString)
                .then((response4) => {
                    console.log(response4.rows)
                    //maps over qualifier
                    const salesQualifiers = response4.rows.map((item, index) => {
                        return qualifiers = item.salesQualifier
                    })
                    console.log(salesQualifiers)
                    //For loop to determine if salesperson is already at max bonus tier    
                    for (let i = 0; i < salesQualifiers.length; i++) {
                        if (empBonusTier >= salesQualifiers.length) {
                            //if at max bonus return 201
                            res.sendStatus(201);
                            //checks to see if salesperson sale total qualifies for an increased bonus tier
                        } else if (totalProductsSold >= salesQualifiers[(i + 1)] && empBonusTier <= (i + 1) ){
                            console.log(i)
                            console.log(salesQualifiers[i])
                            //Updates salesperson on bonus tier if qualifier have been met
                            const queryString = `UPDATE "employees" SET "bonusTier" = "bonusTier" + 1
                            WHERE "employees".id = ${userID};`;
                            pool.query(queryString)
                            .then((response) => {
                                res.sendStatus(201);
                            })
                            .catch((err) => {
                                res.sendStatus(500);
                                console.log(err)
                            })
                        } else {
                                res.sendStatus(201);
                        }
                    }
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
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err)
        })
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err)
    })}
});

module.exports = router;