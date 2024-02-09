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

const employees = [];

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

const internQuestions = [
    {
        type: 'input',
        message: 'Type intern name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type intern name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type intern name: ',
        default: 'John Smith',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Type intern name: ',
        default: 'John Smith',
        name: 'name'
    }
];

const menuQuestions = [
    {
        type: 'list',
        message: 'Chose one of the options: ',
        choices: ['Add engineer.', 'Add intern.', 'I finished building my team.'],
        name: 'menu'
    }
];

async function createManager(){

};

async function showMenu(){

};

async function createEngineer(){

};

async function createIntern(){

} 

async function createManager() {
    try {
        const userResponses = await inquirer.prompt(managerQuestions);
        const manager = new Manager(userResponses.name, userResponses.id, userResponses.email, userResponses.officeNumber);
        employees.push(manager);
    }   catch(error) {
        console.log(error);
    }
   await showMenu();
}
async function showMenu() {
    try {
        const userResponse = await inquirer.prompt(menuQuestions);
        switch (userResponse.menu) {
            case "Add an engineer?":
                await createEngineer();
                break;
            case 'Add an intern?':
                await createIntern();
                break;
            default:
                writeToFile();
        }
    } catch(error) {
        console.log(error);
    }
}
async function createEngineer(){
    try {
        const userResponses = await inquirer.prompt(engineerQuestions);
        const engineer = new Engineer(userResponses.name, userResponses.id, userResponses.email, userResponses.github);
        employees.push(engineer);
    }   catch(error) {
        console.log(error);
    }
    await showMenu();
}
async function createIntern(){
    try {
        const userResponses = await inquirer.prompt(internQuestions);
        const intern = new Intern(userResponses.name, userResponses.id, userResponses.email, userResponses.school);
        employees.push(intern);
    }   catch(error) {
        console.log(error);
    }
   await showMenu();
}
function writeToFile() {
    if(fs.existsSync(OUTPUT_DIR)) {
        fs.writeFileSync(outputPath, render(employees))
    } else {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath, render(employees))
    }
}
async function main(){
    await createManager();
    writeToFile();
}
main();