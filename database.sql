
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "teamName" varchar UNIQUE NOT NULL
);

CREATE TABLE "bonusTier" (
  "id" SERIAL PRIMARY KEY,
  "tier" int,
  "salesQualifier" int,
  "modifier" numeric
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "productName" varchar,
  "costPerUnit" numeric,
  "pricePerUnit" numeric
);

CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "userName" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar,
  "position" varchar,
  "securityLevel" int,
  "hireDate" DATE,
  "baseSalary" int,
  "bonusTier" int REFERENCES "bonusTier" DEFAULT 1,
  "team_id" int REFERENCES teams
);

CREATE TABLE "sales" (
  "id" SERIAL PRIMARY KEY,
  "employees_id" int REFERENCES employees,
  "orderDate" DATE,
  "transactionNumber" varchar
);

CREATE TABLE "sales_products" (
  "id" SERIAL PRIMARY KEY,
  "sales_id" int REFERENCES sales,
  "product_id" int REFERENCES products,
  "unitsSold" int
);
INSERT INTO "teams" ("teamName")
VALUES ('Red Team'),
		('Blue Team');

INSERT INTO "bonusTier" ("tier", "salesQualifier", "modifier")
VALUES (1, 0, 0.1),
		(2, 20, 0.2),
		(3, 30, 0.3);
		
INSERT INTO "products" ("productName", "costPerUnit", "pricePerUnit")
VALUES ('Product 1', 12.50, 55.99),
 		('Product 2', 21.36, 74.99),
 		('Product 3', 25.59, 94.99);
 		
INSERT INTO "employees" ("firstName", "lastName", "userName", "password", "email", "position", "securityLevel", "hireDate", "baseSalary", "bonusTier", "team_id")
VALUES ('Allknowing', 'Admin', 'Admin1', 'password1', 'allenlucke@gmail.com', 'Developer', 20, '01-01-2001', 1000000, null, null);

INSERT INTO "employees" ("firstName", "lastName", "userName", "password", "email", "position", "securityLevel", "hireDate", "baseSalary", "bonusTier", "team_id")
VALUES ('Thomas', 'Jones', 'tjones', 'password2', 'allenlucke@gmail.com', 'Sales', 1, '02/23/2018', 50000, 1, 1),
('Judy', 'Thomas', 'jthomas', 'password3', 'allenlucke@gmail.com', 'Sales', 1, '03/25/1997', 55000, 2, 1),
('Ed', 'Reid', 'ereid', 'password4', 'allenlucke@gmail.com', 'Sales', 1, '12/29/2015', 60000, 3, 1),
('Nancy', 'Ernst', 'nernst', 'password5', 'allenlucke@gmail.com', 'Manager', 3, '11/26/2011', 80000, null, 1),
('Joan', 'Ledger', 'jledger', 'password6', 'allenlucke@gmail.com', 'Sales', 1, '12/02/2005', 62000, 3, 2),
('William', 'Andrews', 'wandrews', 'password7', 'allenlucke@gmail.com', 'Sales', 1, '07/06/2007', 65000, 3, 2),
('James', 'Young', 'jyoung', 'password8', 'allenlucke@gmail.com', 'Manager', 3, '08/19/2014', 75000, null, 2);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (2, '10/10/2018', 85302);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (1, 1, 5);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (2, '10/10/2018', 85302);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (2, 2, 3);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (2, '10/10/2018', 85303);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (3, 3, 3);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (3, '10/10/2018', 85304);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (4, 3, 23);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (4, '10/10/2018', 85305);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (5, 2, 33);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (4, '10/10/2018', 85306);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (6, 1, 8);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (4, '10/10/2018', 85307);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (7, 3, 12);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (6, '10/10/2018', 85308);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (8, 3, 24);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (6, '10/10/2018', 85308);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (9, 2, 14);

INSERT INTO "sales"	("employees_id", "orderDate", "transactionNumber")
VALUES (7, '10/10/2018', 85309);
INSERT INTO "sales_products" ("sales_id", "product_id", "unitsSold")
VALUES (10, 3, 44);