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

