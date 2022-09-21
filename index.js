// required packages
const inquirer = require("inquirer");
const fs = require("fs");

// pulls in the employees
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// create an empty array for the team members
const team = [];

//questions asked to the manager for their info
function managerQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNo",
      },
      {
        type: "list",
        message: "Which is the next employee you would like to add?",
        choices: ["none", "Engineer", "Intern"],
        name: "nextEm",
      },
    ])

    //pushes the manager's data into the team array
    .then((data) => {
      let employee = new Manager(data.name, data.id, data.email, data.officeNo);
      team.push(employee);

      //decides where to sends you next based on choice made earlier
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}


// questions for the engineer's info
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

      //decides where to sends you next based on choice made earlier
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}

// questions for intern's info
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
      //decides where to sends you next based on choice made earlier
      if (data.nextEm === "none") {
        generateTeam();
      } else if (data.nextEm === "Engineer") {
        engineerQuestions();
      } else {
        internQuestions();
      }
    });
}

// generates the team html
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
    <div class="jumbotron jumbotron-fluid bg-dark text-white">
      <div class="container">
        <h1 class="display-4 d-flex justify-content-center">My team</h1>
      </div>
    </div>
<body>
    <div class="container">
    <div class="row">`
  );
  console.log(team)
  for (let i = 0; i < team.length; i++) {
    if (team[i].officeNo) {
      card = `
      <div class="col card">
      <h1>${team[i].name}</h1>
      <h4><i class="fa-solid fa-mug-hot"></i> Manager</h4>
      <p>id: ${team[i].id}</p>
      <p>Email: ${team[i].email}</p>
      <p>Office Number: ${team[i].officeNo}</p>
       </div>`
    }else if (team[i].github){
      card = `
      <div class="col card">
      <h1>${team[i].name}</h1>
      <h4><i class="fa-solid fa-glasses"></i> Engineer</h4>
      <p>id: ${team[i].id}</p>
      <p>Email: ${team[i].email}</p>
      <p>Github: ${team[i].github}</p>
       </div>`
    }else {
      card = `
      <div class="col card">
      <h1>${team[i].name}</h1>
      <h4><i class="fa-brands fa-wpbeginner"></i> Intern</h4>
      <p>id: ${team[i].id}</p>
      <p>Email: ${team[i].email}</p>
      <p>School: ${team[i].school}</p>
      </div>`
    };


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
    <script src="https://kit.fontawesome.com/73525b73cb.js" crossorigin="anonymous"></script>
    </body>
    </html>
        `
  );
}

managerQuestions();
