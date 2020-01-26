

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
