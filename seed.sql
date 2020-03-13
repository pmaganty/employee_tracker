DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Insert a set of records.
INSERT INTO department (name) VALUES ("engineering");
INSERT INTO role (title, salary, department_id) VALUES ("engineer", 80, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("pran", "maganty", 1, 6);

SELECT *
FROM employee
INNER JOIN role ON employee.role_id=role.id
WHERE title="engineer";

SELECT *
FROM role
INNER JOIN department ON role.department_id=department.id
WHERE name="engineering";

SELECT * FROM role WHERE title="engineer";

UPDATE employee
SET last_name = "nothing"
WHERE first_name="pranitha";

SELECT *
FROM employee AS top
   INNER JOIN
   role AS role_sub
   ON top.role_id = role_sub.id
   INNER JOIN
   department AS dep_sub
   ON role_sub.department_id = dep_sub.id

