## Commissionable Payroll App

## Description
Duration: Two-Week Sprint

The Commissionable Payroll App is a Single Page Application designed as a template for a business that employs salespeople who's wages are based in some part on a commission scale. The application does many things, but it's primary function is to provide an up-to-date status of each employees commissions as they move through various bonus tiers and modifiers( Example: A salesperson that sells 30 products is payed a greater percentage of their sales percentage that is higher than a salesperson that only sells 10. ).

The App at present has three "Security Levels" of employees. Salesperson, Manager, and Admin. A salesperson may add new sales as well as view their own sales and commissions. A manager can view all the sales and commissions of all salespeople on their own team. An Admin can view the sales and commissions of all teams and employees. As well as add new employees and if need be terminate an employee.

As this is designed to be an application for internal access to the application will only be granted to employees. New employees will automatically be sent their username and a starting password. Along with instructions to change their password upon initial login.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation
1. Fork or Clone the repo from github.
2. Run 'NPM install' in the terminal to install all dependencies.
3. Create a `.env` file at the root of the project ( See `.env` File Setup ).
4. See Create database and table to create your database.
5. Run 'NPM run server' in the terminal.
6. See Creating Admin User to create and admin account.
7. Open a second terminal and run 'NPM run client'.
8. Navigate to `localhost:3000` and login with you admin username and password.

## `.env File Setup
In the `.env` file you will need the following lines fo code for nodemailer to access you gmail account.

    `USERNAME=yourEmail@gmail.com
     PASSWORD=yourPassword
     FROM=yourEmail@gmail.com`

Replace `yourEmail` with your email address and `yourPassword` with your email password.
Visit https://myaccount.google.com/lesssecureapps and click Allow less secure apps: ON.
This will allow the nodemailer feature access to your email so you can send username and passwords to your new employees.

## Create database and table

Create a new database called `commission_app` and run the queries from the `database.sql` file.

If you would like to name your database something else, you will need to change `commission_app` to the name of your new database name in `server/modules/pool.js`

## Creating Admin User
This process can be a little tricky. However doing so will allow you to create Admin access to the app which you will need to utilize the app and grant access to your employees as well.

1. Got to the adminAddEmployeePage.router at `server/routes/admin.router/adminAddEmployeePage.router`. And comment out the code in the screenshot. Doing so will allow you to bypass the initial security checks to create your Admin account.
![](public/images/addEmp1.png)

2. Go to Postman and run the route in the screenshot. Name the user etc. whatever you like, but be sure to use your own email address and set the securityLevel to 10 or above.
![](public/images/addEmp2.png)
3. Don't forget to uncomment the code you commented out in step 1.
![](public/images/addEmp3.png)

* Navigate to `localhost:3000`

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum. 

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Passport. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
    1. `POST /api/user/register` registers a new user, see body to change username/password
    2. `POST /api/user/login` will login a user, see body to change username/password
    3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Screenshots

## Usage

## Built with
Node, Express, Javascript, PostgreSQL, React, Redux, Nodemailer, html, CSS, Logger, Body-Parser A full list of dependencies can be found in `package.json`.

## Acknowledgement
Thanks to Prime Digital Academy in Kansas City who equipped and helped me to make this application a reality. Specifically Scott, Myron, and the Tyto cohort.

## Support
If you have suggestions or issues, please email me at allenlucke@gmail.com