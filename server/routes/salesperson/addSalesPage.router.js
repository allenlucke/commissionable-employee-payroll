//Salesperson Add Sales Page Router
//All Salesperson Add Sales Page Routes go here
const express = require('express');
const router = express.Router();
const pool = require('./../../modules/pool');

// Post Route for Salesperson Add Sales Page
router.post('/', (req, res) => {
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
        response.rows.map((item, index) => {
            return newSalesId = item.id;
        })
        console.log(newSalesId)
        const queryString = `INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
        VALUES (${newSalesId}, ${product_id}, ${unitsSold});`;
        pool.query(queryString)
        .then((response2) => {
            const queryString = `SELECT "employees".id, "employees"."bonusTier", 
            SUM("sales_products"."unitsSold") AS "totalProductsSold" FROM "employees"
            JOIN "sales" ON "employees".id = "sales".employees_id
            JOIN "sales_products" ON "sales".id = "sales_products".sales_id
            WHERE "employees".id = ${userID}
            GROUP BY "employees".id;`;
            pool.query(queryString)
            .then((response3) => {
                console.log(response3.rows)
                response3.rows.map((item, index) => {
                    return totalProductsSold = item.totalProductsSold;
                })
                response3.rows.map((item, index) => {
                    return empBonusTier = item.bonusTier;
                })
                console.log(empBonusTier)
                console.log(totalProductsSold)
                const queryString = `SELECT * FROM "bonusTier"`;
                pool.query(queryString)
                .then((response4) => {
                    console.log(response4.rows)
                    const salesQualifiers = response4.rows.map((item, index) => {
                        return qualifiers = item.salesQualifier
                    })
                    console.log(salesQualifiers)    
                    for (let i = 0; i < salesQualifiers.length; i++) {
                        if (empBonusTier >= salesQualifiers.length) {
                            res.sendStatus(201);
                        } else if (totalProductsSold >= salesQualifiers[(i + 1)] && empBonusTier <= (i + 1) ){
                            console.log(i)
                            console.log(salesQualifiers[i])
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
    })
});

module.exports = router;