const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

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

const menuQuestions = [
    {
        type: 'list',
        message: 'Chose one of the options: ',
        choices: ['Add engineer.', 'Add intern.', 'I am done building my team.'],
        name: 'menu'
    }
];

async function createManager() {
    try {
        const answers = await inquirer.prompt(managerQuestions);
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);
    }   catch(error) {
        console.log(error);
    }
   await showMenu();
}
async function showMenu() {
    try {
        const answers = await inquirer.prompt(menuQuestions);
        switch (answers.menu) {
            case 'Add engineer.':
                await createEngineer();
                break;
            case 'Add intern.':
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
        const answers = await inquirer.prompt(engineerQuestions);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
    }   catch(error) {
        console.log(error);
    }
    await showMenu();
}
async function createIntern(){
    try {
        const answers = await inquirer.prompt(internQuestions);
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
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