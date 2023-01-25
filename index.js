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
    ],
  };
  const departmentQuestion = {
    type: "input",
    message: "what is the new Department name?",
    name: "answer"
  }
  
function promptMenu() {

  inquirer.prompt(menuquestion).then(({answer}) => {
    console.log(answer);
    switch (answer){
      case "departments":
        viewDepartments();
        break;
      case "roles":
        viewRoles();
        break;
      case "employees":
        viewEmployees();
        break;
       case "add a department" :
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "add a employee":
        addEmployee();
        break;
      default: 
      console.log('wrong')

    
    }
  })
}

async function viewDepartments() {
  const [departments] = await connection.promise().query("SELECT * FROM department;")
  console.table(departments)
  promptMenu();
}

async function viewRoles() {
  const [roles] = await connection.promise().query("SELECT * FROM role;")
  console.table(roles)
  promptMenu();
}

async function viewEmployees() {
  const [employees] = await connection.promise().query("SELECT * FROM employee;")
  console.table(employees)
promptMenu();
}
async function addDepartment() {
  const {answer} = inquirer.prompt(departmentQuestion)
  
}

promptMenu();
  

  

// const obj = { answer: 'emp', name:"justin", occupation: "coder" }

// const {occupation} = obj
// console.log(occupation)

// const arr = ["bob", "sally", "steve"]

// const [name1] = arr

// console.log(name1)


// switch (answers.answer) {
//   case "role":
//     console.log("I NEED TO VIEW ALL ROLES")
//     break;
//   case "department":
//     console.log("I NEED TO VIEW ALL deps")
//     break;
//   case "emp":
//     console.log("I NEED TO VIEW ALL emps")
//     break;
//   default:
//     console.log("I HIT THE DEFAULT")
//     break;
// }