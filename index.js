const inquirer = require("inquirer");
const connection = require("./connection");

const menuquestion = {
  type: "list",
  message: "please choose what you want to view.",
  name: "answer",
  choices: [
    "departments",
    "roles",
    "employees",
    "add a department",
    "add a role",
    "add a employee",
    "update an employee role",
    "Quit",
  ],
};

function promptMenu() {
  inquirer.prompt(menuquestion).then(({ answer }) => {
    console.log(answer);
    switch (answer) {
      case "departments":
        viewDepartments();
        break;
      case "roles":
        viewRoles();
        break;
      case "employees":
        viewEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "add a employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

async function viewDepartments() {
  const [departments] = await connection
    .promise()
    .query("SELECT * FROM department;");
  console.table(departments);
  promptMenu();
}

async function viewRoles() {
  const [roles] = await connection.promise().query("SELECT * FROM role;");
  console.table(roles);
  promptMenu();
}

async function viewEmployees() {
  const [employees] = await connection
    .promise()
    .query("SELECT * FROM employee;");
  console.table(employees);
  promptMenu();
}
async function addDepartment() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "What is the name of the department?",
    name: "deptName",
  });
  const result = await connection
    .promise()
    .query("INSERT INTO department (name) VALUES (?)", [answer.deptName]);
  console.table(result);
  promptMenu();
}

async function addRole() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "What would you like the name of the role to be?",
      name: "roleName",
    },
    {
      type: "input",
      message: "How about the salary?",
      name: "salaryTotal",
    },
    {
      type: "input",
      message: "Lastly, give the new role a department id?",
      name: "deptID",
    },
  ]);
  const result = await connection
    .promise()
    .query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [
      answer.roleName,
      answer.salaryTotal,
      answer.deptID,
    ]);
  console.table(result);
  promptMenu();
}

async function addEmployee() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "FirstName",
    },
    {
      type: "input",
      message: "What about the last name?",
      name: "LastName",
    },
    {
      type: "input",
      message: "What is this person's role id number?",
      name: "roleID",
    },
    {
      type: "input",
      message: "And what about the manager id?",
      name: "managerID",
    },
  ]);
  const result = await connection
    .promise()
    .query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [answer.FirstName, answer.LastName, answer.roleID, answer.managerID]
    );
  console.table(result);
  promptMenu();
}

async function updateEmployeeRole() {
    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },
      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ]);
    return new Promise((resolve, reject) => {
      connection.promise().query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.employeeUpdate],function(err, res) {
        if (err) reject(err);
        resolve(console.table(res));
        
      });
      promptMenu();
    });
    
}


promptMenu();


function quit() {
  connection.end();
  process.exit();
}
