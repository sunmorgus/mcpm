var minimist = require('minimist');
var chalk = require('chalk');
var path = require('path');

var errorCodes = require('../globals/error-codes');
var inquirerHelper = require('../helpers/inquirer-helper');
var fsHelper = require('../helpers/fs-helper');
var zipHelper = require('../helpers/zip-helper');
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
                case 'pack':
                    break;
                default:
                    reject({
                        message: 'Invalid action provided',
                        code: errorCodes.InvalidAction
                    });
            }
        });
    },
    writePackage(mcpmPackage) {
        return new Promise((resolve, reject) => {
            var created = false;

            created = fsHelper.writeFolderSync('mod');
            created = fsHelper.writeMcpmPackageSync(mcpmPackage);

            fsHelper
                .copyFile(mcpmPackage.modPath, path.join(process.cwd(), 'mod'))
                .then(response => {
                    created = response;
                    resolve(created);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    printUsageSync() {
        // TODO: Print usage
        console.log(chalk.red('You must specify a command: new, install, etc'));
    }
};
