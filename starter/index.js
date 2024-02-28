const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Create an empty team array
const employees = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employeeQuestions = {
    Manager: [
        { name: "name", message: "Enter the Team manager's name?" ,
        validate: name => {
            if (name) {
                return true;
            } else {
                console.log("Please enter the Team manager's Name!")
                return false;
            }
        }
    },
        { name: "managerId", message: "What is the Team manager's employee id?" ,
        validate: managerId => {
                        if (managerId) {
                            return true;
                        } else {
                            console.log("Please enter the Manager's ID !")
                            return false;
                        }
                    }
    },
        { name: "email", message: "What is the team manager's email address?" ,
        validate: email => {
                        if (email) {
                            return true;
                        } else {
                            console.log("Please enter the Manager's email address !")
                            return false;
                        }
                    }
    },
        { name: "officeNumber", message: "What is the team manager's office number?" ,
        validate: officeNumber => {
                        if (officeNumber) {
                            return true;
                        } else {
                            console.log("Please enter the Manager's office number!")
                            return false;
                        }
                    }
    }
    ],
    Engineer: [
        { name: "name", message: "What is the Engineer's name?" ,
        validate: name => {
                        if (name) {
                            return true;
                        } else {
                            console.log("Please enter the Engineer's Name!")
                            return false;
                        }
                    }
    },
        { name: "engineerID", message: "What is the Engineer's employee ID?" ,
        validate: engineerID => {
                        if (engineerID) {
                            return true;
                        } else {
                            console.log("Please enter the Engineer's ID !")
                            return false;
                        }
                    }
    },
        { name: "email", message: "What is the Engineer's email address?" ,
        validate: email => {
                        if (email) {
                            return true;
                        } else {
                            console.log("Please enter the Engineer's email address !")
                            return false;
                        }
                    }
    },
        { name: "github", message: "What is the Engineer's GitHub username?",
        validate: github => {
                        if (github) {
                            return true;
                        } else {
                            console.log("Please enter the Engineer's Github Username !")
                            return false;
                        }
                    }
    }
    ],
    Intern: [
        { name: "name", message: "What is the Intern's name?" ,
        validate: name => {
                        if (name) {
                            return true;
                        } else {
                            console.log("Please enter the Intern's Name!")
                            return false;
                        }
                    }
    },
        { name: "internID", message: "What is the Intern's employee id?" ,
        validate: internID => {
                        if (internID) {
                            return true;
                        } else {
                            console.log("Please enter the Intern's ID !")
                            return false;
                        }
                    }
    },
        { name: "email", message: "What is the Intern's email address?" ,
        validate: email => {
                        if (email) {
                            return true;
                        } else {
                            console.log("Please enter the Intern's email address !")
                            return false;
                        }
                    }  
    },
        { name: "school", message: "What school does the Intern attend?" ,
        validate: school => {
                    if(school){
                        return true;
                    }else{
                        console.log("Please enter the Intern's school.")
                        return false;
                    }
                }
    }
    ]
};

const promptEmployee = (role) => {
    return inquirer.prompt(employeeQuestions[role]).then(value => {
        const employee = new (role === 'Manager' ? Manager : role === 'Engineer' ? Engineer : Intern)(...Object.values(value));
        employees.push(employee);
        addEmployee ();
    });
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which employee would you like to add to your Team?",
            choices: ["Engineer", "Intern", "Finish building the team"],
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log("Please select an option !")
                    return false;
                }
            }
        }
    ]).then(({ role }) => {
        if (role === "Finish building the team") {
            writeFile();
        } else {
            promptEmployee(role);
        }
    });
};

const writeFile = () => {
    console.log("Your team profile has been successfully created! Please check out the team.html file");
    fs.writeFileSync(outputPath, render(employees));
};

promptEmployee('Manager');
