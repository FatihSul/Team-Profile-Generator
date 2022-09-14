const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = [];

function managerQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your Manager's id",
        name: "id",
      },
      {
        type: "input",
        message: "What is your Manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your Manager's office number?",
        name: "officeNo",
      },
      {
        type: "list",
        message: "Which is the next employee you would like to add?",
        choices: ["none", "Engineer", "Intern"],
        name: "nextEm",
      },
    ])
    .then((data) => {
      let employee = new Manager(data.name, data.id, data.email, data.officeNo);
      team.push(employee);
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}

function engineerQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your Engineer's id",
        name: "id",
      },
      {
        type: "input",
        message: "What is your Engineer's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your Engineer's github username?",
        name: "github",
      },
      {
        type: "list",
        message: "Which is the next employee you would like to add?",
        choices: ["none", "Engineer", "Intern"],
        name: "nextEm",
      },
    ])
    .then((data) => {
      let employee = new Engineer(data.name, data.id, data.email, data.github);
      team.push(employee);
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}
function internQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your Intern's id",
        name: "id",
      },
      {
        type: "input",
        message: "What is your Intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your Intern's school?",
        name: "school",
      },
      {
        type: "list",
        message: "Which is the next employee you would like to add?",
        choices: ["none", "Engineer", "Intern"],
        name: "nextEm",
      },
    ])
    .then((data) => {
      let employee = new Intern(data.name, data.id, data.email, data.school);
      team.push(employee);
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}

function generateTeam() {
  fs.writeFileSync(
    "dist/team.html",
    `
    
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="Description" content="Enter your description here"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Team Profile Generator</title>
    </head>
<body>
    <div class="container">
        <div class="row">`
  );
  console.log(team)
  for (let i = 0; i < team.length; i++) {
    let card = `
   <div class="col card">
   <p>${team[i].name}</p>
   <p>${team[i].id}</p>
   <p>${team[i].email}</p>
   
   </div>
   `;
    fs.appendFileSync("dist/team.html", card);
  }

  fs.appendFileSync(
    "dist/team.html",
    `
    </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
    </body>
    </html>
        `
  );
}

managerQuestions();
