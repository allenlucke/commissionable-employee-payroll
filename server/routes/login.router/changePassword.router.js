const express = require('express');
const { rejectUnauthenticated } = require('./../../modules/authentication-middleware');
const encryptLib = require('./../../modules/encryption');
const pool = require('./../../modules/pool');
const userStrategy = require('./../../strategies/user.strategy');


const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.put('/', (req, res, next) => { 
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