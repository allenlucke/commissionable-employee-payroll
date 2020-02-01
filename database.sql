--To Create Begining Admin Acct
INSERT INTO "employees" ("firstName", "lastName", "username", "password", "email", "position", "securityLevel", "hireDate", "baseSalary", "bonusTier", "team_id")
VALUES ('Allknowing', 'Admin', 'AllKnowing', '$2b$10$sVnX6V2J1kBkJpMeBgfc9ut7RWkBtRrtyrvOc6SJeVyppWiyMPak6', 'yourEmail@gmail.com', 'Developer', 20, '01-01-2001', 1000000, null, 3);