// Importing necessary modules and classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Setting up the output directory and file path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Importing the render function for generating the HTML page
const render = require("./src/page-template.js");

// Array to store employee information
const employees = [];

// Questions for creating a manager
const managerQuestions = [
    {
        type: 'input',
        message: 'Type manager name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type emlpoyee id: ',
        default: '123',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Type emlpoyee email: ',
        default: '123@email.com',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Type emlpoyee office number: ',
        default: '123',
        name: 'officeNumber'
    }
];

// Questions for creating an engineer
const engineerQuestions = [
    {
        type: 'input',
        message: 'Type engineer name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type engineer id: ',
        default: '123',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Type engineer email: ',
        default: 'test@test.com',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Type engineer GitHub : ',
        default: 'github.com/user',
        name: 'github'
    }
];

// Questions for creating an intern
const internQuestions = [
    {
        type: 'input',
        message: 'Type intern name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type intern id: ',
        default: 'John Smith',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Type intern email: ',
        default: 'intern@email.com',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Type name of your school: ',
        default: 'University of London',
        name: 'school'
    }
];

// Questions for the menu options
const menuQuestions = [
    {
        type: 'list',
        message: 'Chose one of the options: ',
        choices: ['Add engineer.', 'Add intern.', 'I am done building my team.'],
        name: 'menu'
    }
];

// Function to create a manager
async function createManager() {
    try {
        // Prompting the manager questions
        const answers = await inquirer.prompt(managerQuestions);
        // Creating a new Manager instance
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        // Adding the manager to the employees array
        employees.push(manager);
    }   catch(error) {
        console.log(error);
    }
    // Showing the menu after creating a manager
   await showMenu();
}

// Function to display the menu and handle user choices
async function showMenu() {
    try {
        // Prompting the menu questions
        const answers = await inquirer.prompt(menuQuestions);
        switch (answers.menu) {
            case 'Add engineer.':
                // Proceeding to create an engineer
                await createEngineer();
                break;
            case 'Add intern.':
                // Proceeding to create an intern
                await createIntern();
                break;
            default:
                // Writing to the file when user is done building the team
                writeToFile();
        }
    } catch(error) {
        console.log(error);
    }
}

// Function to create an engineer
async function createEngineer(){
    try {
        // Prompting the engineer questions
        const answers = await inquirer.prompt(engineerQuestions);
        // Creating a new Engineer instance
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // Adding the engineer to the employees array
        employees.push(engineer);
    }   catch(error) {
        console.log(error);
    }
    // Showing the menu after creating an engineer
    await showMenu();
}

// Function to create an intern
async function createIntern(){
    try {
        // Prompting the intern questions
        const answers = await inquirer.prompt(internQuestions);
        // Creating a new Intern instance
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        // Adding the intern to the employees array
        employees.push(intern);
    }   catch(error) {
        console.log(error);
    }
    // Showing the menu after creating an intern
   await showMenu();
}

// Function to write the generated HTML to a file
function writeToFile() {
    // Checking if the output directory exists
    if(fs.existsSync(OUTPUT_DIR)) {
        // Writing the HTML file
        fs.writeFileSync(outputPath, render(employees))
    } else {
        // Creating the output directory if it doesn't exist
        fs.mkdirSync(OUTPUT_DIR);
        // Writing the HTML file
        fs.writeFileSync(outputPath, render(employees))
    }
}

// Main function to execute the program
async function main(){
    // Starting with creating a manager
    await createManager();
    // Writing to the file after completing the team
    writeToFile();
}

// Calling the main function to start the program
main();