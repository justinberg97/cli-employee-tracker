const inquirer = require("inquirer");
const questions = [
  { type: "input", message: "something in", name: "first" },
  {
    type: "list",
    message: "please choose one",
    name: "second",
    choices: ["first string", "second string", "third string"],
  },
  { name: "third", message: "tell me a joke", type: "input" },
];

