const express = require('express');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');
const encryptLib = require('./../../modules/encryption');
const pool = require('./../../modules/pool');
const userStrategy = require('./../../strategies/user.strategy');


const router = express.Router();

// Handles PUT request with new user data
// Password gets encrypted before being inserted
router.put('/', rejectUnauthenticated, (req, res, next) => { 
    const userID = req.body.userID; 
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
  
    const queryText = `UPDATE "employees" SET "password" = '${password}'
    WHERE "employees".username = '${username}';`;
    pool.query(queryText)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });
module.exports = router;