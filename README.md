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

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.



## Create database and table

Create a new database called `commission_app` and run the queries from the `database.sql` file.

If you would like to name your database something else, you will need to change `commission_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


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