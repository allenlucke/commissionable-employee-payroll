
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// ROUTES IMPORTS
const userRouter = require('./routes/user.router');
//Admin Routes
const adminRouter = require('./routes/admin.router');
//Salesperson Routes
const salesPersonHomePageRouter = require('./routes/salesperson.router/homePage.router');
const salesPersonViewSalesPageRouter = require('./routes/salesperson.router/viewSalesPage.router');
const salespersonAddSaleRouter = require('./routes/salesperson.router/addSalesPage.router');
//Manager Routes
const managerHomePageRouter = require('./routes/manager.router/homePage.router');
const managerAllSalesPageRouter = require('./routes/manager.router/allSales.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
//User Routes
app.use('/api/user', userRouter);
//Admin Routes
app.use('/api/admin', adminRouter);
// //Salesperson Routes//
app.use('/api/salesperson/AddSale', salespersonAddSaleRouter);
app.use('/api/salesperson', salesPersonHomePageRouter);
app.use('/api/salesperson/Sales', salesPersonViewSalesPageRouter);
// //Manager Routes//
app.use('/api/manager', managerHomePageRouter);
app.use('/api/manager/AllSales', managerAllSalesPageRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
