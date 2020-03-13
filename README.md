## Project: Employee Tracker
## Author: Pranitha Maganty
### Description: Allows user to create a database of employees, roles, and departments
### Github Repo Link: https://github.com/pmaganty/employee_tracker

#### Preliminary to-do:
+ Enter "npm i" to grab all dependency libraries

#### How to use:
+ Run the server.js file using "node server.js" inside the same directory hierarchy that it exists
+ User is given the following options to choose from:
    - View all employees
    - View all employees by department
    - View all employees by role
    - Add employee
    - Add department
    - Add role
    - Update employee role
+ Each prompt will modify the database or show what is in the database according to the option chosen by the user.
+ User may be prompted to answer additional questions based on which option is chosen
+ After adding employees, roles, departments, or changing employee roles - make sure to go back and view all
employees to make sure the database was updated as expected

#### File Contents:
+ index.js
    - contains main javascript that gives the application its base functionality
+ seed.sql
    - contains basic database info with tables for employees, roles, departments
+ package.json
    - contains all dependencies required for application to run