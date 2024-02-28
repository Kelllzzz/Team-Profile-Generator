const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Name of Employee ? :',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please Provide Employee id:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address ?:',
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is your role:',
        choices: ['Manager', 'Engineer', 'Intern'],
    },

];

//if Manager role is selected
const questionsForManager = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please input your office number:',
    },
];

//if Engineer role is selected
const questionsForEngineer = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username ? :',
    },
];

//if intern role is selected
const questionsForIntern = [
    {
        type: 'input',
        name: 'school',
        message: 'What school do you attend ? :',
    },
];

const init = async () => {
    const employees = [];
    let addMore = true;

    while (addMore) {
        try {
            const { name, id, email, role } = await inquirer.prompt(questions);

            let additionalPrompt = null;
            if (role === 'Manager') {
                additionalPrompt = inquirer.prompt(questionsForManager);
            } else if (role === 'Engineer') {
                additionalPrompt = inquirer.prompt(questionsForEngineer);
            } else {
                additionalPrompt = inquirer.prompt(questionsForIntern);
            }

            const { officeNumber, github, school } = await additionalPrompt;

            if (role === 'Manager') {
                employees.push(new Manager(name, id, email, officeNumber));
            } else if (role === 'Engineer') {
                employees.push(new Engineer(name, id, email, github));
            } else {
                employees.push(new Intern(name, id, email, school));
            }

            const { adding } = await inquirer.prompt({
                type: 'confirm',
                name: 'adding',
                message: 'Do you want to add more employees?',
                default: true
            });
            addMore = adding;
        } catch (error) {
            console.error("Error occurred while adding employees:", error);
            return employees; // Return the current employees array in case of an error
        }
    }

    return employees;
};

// function to generate HTML
init().then(employees => {
    const html = render(employees); 
    const OUTPUT_DIR = path.resolve(__dirname, 'output');
    const outputPath = path.join(OUTPUT_DIR, 'team.html');

    fs.mkdirSync(OUTPUT_DIR, { recursive: true }); // Create the output directory if it doesn't exist
    fs.writeFileSync(outputPath, html); // Write the HTML to a file
    console.log("Your team's basic info HTML is created!");
}).catch(error => {
    console.error("Error in init function:", error);
});