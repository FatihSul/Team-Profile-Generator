const Employee = require("./Employee")

class Engineer extends Employee{
    constructor(name, id, email, github){
        // super pulls the this.name, id & email from Employee
        super(name, id, email)
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer"
    }
}
module.exports = Engineer;