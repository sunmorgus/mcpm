var minimist = require('minimist');
var chalk = require('chalk');

var errorCodes = require('../globals/error-codes');
var inquirerHelper = require('../helpers/inquirer-helper');
var McpmPackage = require('../models/mcpm-package');

module.exports = {
    /**
     * Builds the mcpm-package object based on args or inquirer answers
     * @param {Object} argv process.argv
     */
    getMcpmPackage(argv) {
        return new Promise((resolve, reject) => {
            var args = minimist(argv.slice(2));

            if (args._.length === 0 || args._.length > 1) {
                reject({
                    message: 'No arguments provided',
                    code: errorCodes.NoArgs
                });
            }

            var action = args._[0];
            var mcpmPackage = new McpmPackage();

            switch (action) {
                case 'init':
                    var questions = mcpmPackage.getQuestions();

                    var answers = inquirerHelper
                        .prompt(questions)
                        .then(answers => {
                            mcpmPackage.fill(answers);
                            resolve(mcpmPackage);
                        });
                    break;
                default:
                    reject({
                        message: 'Invalid action provided',
                        code: errorCodes.InvalidAction
                    });
            }
        });
    },
    printUsage() {
        // TODO: Print usage
        console.log(chalk.red('You must specify a command: new, install, etc'));
    }
};
