
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Routes includes
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const salespersonRouter = require('./routes/salesperson.router');
// const managerRouter = require('./routes/manager.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
//User Route
app.use('/api/user', userRouter);
//Admin Route
app.use('/api/admin', adminRouter);
// //Salesperson Routes//
app.use('/api/salesperson', salespersonRouter);
// //Manager Routes//
// app.use('/api/manager', managerRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
