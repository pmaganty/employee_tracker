const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
//let rolesArr = ["engineer"];
//let departmentArr = ["engineering"];
//let employeeFirstNameArr = ["pran"];
//let employeeLastNameArr = ["maganty"];

// MySQL DB Connection Information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "companyDB"
  });
  
  // Initiate MySQL Connection.
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  // INITIAL INQUIRER
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by role",
          "Add employee",
          "Add department",
          "Add role",
          "Update employee role"
        ]
      })
      .then(function(answer) {
        //console.log(answer.action); //FOR DEBUG

        switch (answer.action) {
            case "View all employees":
              viewAllEmployees();
              break;
      
            case "View all employees by department":
              viewByDepartments();
              break;
      
            case "View all employees by role":
              viewByRoles();
              break;
      
            case "Add employee":
              addEmployee();
              break;
      
            case "Add department":
              addDepartment();
              break;

            case "Add role":
              addRole();
            break;
        
            case "Update employee role":
              updateEmployeeRole();
            break;
            }
      });
  }

  // FUNCTIONS
    function viewAllEmployees () {
        let query = "SELECT * FROM employee AS top INNER JOIN role AS role_sub ON top.role_id = role_sub.id INNER JOIN department AS dep_sub ON role_sub.department_id = dep_sub.id";
        let values = [];
        connection.query(query, function(err, res) {
          //console.log(res); //FOR DEBUG
          for (let i = 0; i < res.length; i++) {
            let currentVal = {
                id: res[i].id,
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                title: res[i].title,
                department: res[i].name,
                salary: res[i].salary
            }
            values.push(currentVal);
          }
          console.table(values);
          runSearch();
        });
    }

    function viewByDepartments () {
        let query = "SELECT * FROM employee AS top INNER JOIN role AS role_sub ON top.role_id = role_sub.id INNER JOIN department AS dep_sub ON role_sub.department_id = dep_sub.id ORDER BY name";
        let values = [];
        connection.query(query, function(err, res) {
          //console.log(res); //FOR DEBUG
          for (let i = 0; i < res.length; i++) {
            let currentVal = {
                id: res[i].id,
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                title: res[i].title,
                department: res[i].name,
                salary: res[i].salary
            }
            values.push(currentVal);
          }
          console.table(values);
          runSearch();
        });
    }

    function viewByRoles () {
        let query = "SELECT * FROM employee AS top INNER JOIN role AS role_sub ON top.role_id = role_sub.id INNER JOIN department AS dep_sub ON role_sub.department_id = dep_sub.id ORDER BY title";
        let values = [];
        connection.query(query, function(err, res) {
          //console.log(res); //FOR DEBUG
          for (let i = 0; i < res.length; i++) {
            let currentVal = {
                id: res[i].id,
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                title: res[i].title,
                department: res[i].name,
                salary: res[i].salary
            }
            values.push(currentVal);
          }
          console.table(values);
          runSearch();
        });
    }

    function addEmployee () {
        let arr = [];

        let initial_query = "SELECT * FROM role"
        connection.query(initial_query, function(err, res) {
            for (let i = 0; i < res.length; i++) {
                arr.push(res[i].title);
              }
        });

        inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "Enter employee first name: "
          },
          {
            name: "last_name",
            type: "input",
            message: "Enter employee last name: "
          },
          {
            name: "role",
            type: "rawlist",
            message: "Which role is the employee in: ",
            choices: arr
          },
          {
            name: "manager_id",
            type: "input",
            message: "Enter manager id: "
          }
        ]).then(function(answer) {
            //console.log(answer); //FOR DEBUG

            let newFirstName = answer.first_name;
            let newLastName = answer.last_name;
            let newRole = answer.role; //use to retrive role id
            let managerId = answer.manager_id; //need to change later on
            let newRoleId = 0; //temporary initial value

            let values = [];

            let query1 = "SELECT * FROM role WHERE title=?"
            connection.query(query1, newRole, function(err, res1) {
                //console.log("res1", res1); //FOR DEBUG
                newRoleId = res1[0].id;
                //console.log("newRoleId", newRoleId); //FOR DEBUG

                let query2 = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
                connection.query(query2, [newFirstName, newLastName, newRoleId, managerId], function(err, res2) {
                    //console.log("insert", res2); //FOR DEBUG

                    runSearch();
                });
            });

        });
    }

    function addDepartment () {
        inquirer
        .prompt([
          {
            name: "department_name",
            type: "input",
            message: "Enter department name: "
          }
        ]).then(function(answer) {
            //console.log(answer); //FOR DEBUG

            let newDepartment = answer.department_name;
            //console.log(newDepartment);; //FOR DEBUG

            let query = "INSERT INTO department (name) VALUES (?)"
            connection.query(query, newDepartment, function(err, res) {
                //console.log(res); //FOR DEBUG
                runSearch();
            });
          });
    }

    function addRole () {
        let arr = [];

        let initial_query = "SELECT * FROM department"
        connection.query(initial_query, function(err, res) {
            for (let i = 0; i < res.length; i++) {
                arr.push(res[i].name);
              }
        });

        inquirer
        .prompt([
          {
            name: "role_title",
            type: "input",
            message: "Enter role title: "
          },
          {
            name: "role_salary",
            type: "input",
            message: "Enter role salary: "
          },
          {
            name: "role_department",
            type: "rawlist",
            message: "Which department is this role a part of? ",
            choices: arr
          }
        ]).then(function(answer) {
            //console.log(answer); //FOR DEBUG

            let newRoleTitle = answer.role_title;
            let newRoleSalary = answer.role_salary;
            let newRoleDepartment = answer.role_department;

            let newDepartmentId = 0; //initial set to 0

            let query1 = "SELECT * FROM department WHERE name=?"
            connection.query(query1, newRoleDepartment, function(err, res1) {
                //console.log(res1[0].id); //FOR DEBUG
                newDepartmentId = res1[0].id;
                //console.log(newDepartmentId); //FOR DEBUG

                let query2 = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
                connection.query(query2, [newRoleTitle, newRoleSalary, newDepartmentId], function(err, res2) {
                    //console.log(res2); //FOR DEBUG

                    runSearch();
                });
            });
        });
    }

    function updateEmployeeRole () {
        let arrFirst = [];
        let arrLast = [];
        //let arrName = [];
        let arrRole = [];

        let initial_query1 = "SELECT * FROM employee"
        connection.query(initial_query1, function(err, res) {
            //console.log(res); //FOR DEBUG
            for (let i = 0; i < res.length; i++) {
                let currentEmployee = {first_name: res[i].first_name, last_name: res[i].last_name};
                arrFirst.push(res[i].first_name);
                arrLast.push(res[i].last_name);
                //arrName.push(currentEmployee);
              }
              //console.log(arrName); //FOR DEBUG
              //console.log(arrFirst); //FOR DEBUG

              let initial_query2 = "SELECT * FROM role"
            connection.query(initial_query2, function(err, res) {
                  for (let i = 0; i < res.length; i++) {
                      arrRole.push(res[i].title);
                    }


              inquirer
                .prompt([
                {
                    name: "employee_first_name",
                    type: "rawlist",
                    message: "What is the employee's name?",
                    choices: arrFirst
                },
                {
                    name: "employee_last_name",
                    type: "rawlist",
                    message: "What is the employee's last name?",
                    choices: arrLast
                },
                {
                    name: "new_role",
                    type: "rawlist",
                    message: "Which role would you like to switch the employee to: ",
                    choices: arrRole
                }
                ]).then(function(answer) {
                    //console.log(answer); //FOR DEBUG

                    let firstName = answer.employee_first_name;
                    let lastName = answer.employee_last_name;
                    let newRole = answer.new_role;

                    let newRoleId = 0; //initial set to 0

                    let query1 = "SELECT * FROM role WHERE title=?"
                    connection.query(query1, newRole, function(err, res1) {
                        //console.log(res1); //FOR DEBUG
                        newRoleId = res1[0].id;
                        //console.log(newRoleId); //FOR DEBUG

                        let query2 = "UPDATE employee SET role_id = ? WHERE first_name=? AND last_name=?;"
                        connection.query(query2, [newRoleId, firstName, lastName], function(err, res2) {
                            //console.log(res2); //FOR DEBUG
                            runSearch();
                        });
                    });
                });
            });
        });
    }

  runSearch();