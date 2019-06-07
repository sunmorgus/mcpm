var inquirer = require('inquirer');
var inquirerPath = require('inquirer-path').PathPrompt;

module.exports = {
    prompt(questions) {
        return new Promise(resolve => {
            inquirer.registerPrompt('path', inquirerPath);
            inquirer.prompt(questions).then(answers => {
                resolve(answers);
            });
        });
    }
};
