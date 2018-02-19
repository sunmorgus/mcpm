var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');

var mcpm = require('./core/mcpm');
var errorCodes = require('./globals/error-codes');

process.on('SIGINT', function() {
    //graceful shutdown
    process.exit();
});

function run() {
    clear();
    console.log(
        chalk.green(figlet.textSync('MCPM', { horizontalLayout: 'full' }))
    );
    console.log(chalk.yellow('Welcome to the Minecraft Mod Package Manager!'));

    mcpm
        .getMcpmPackage(process.argv)
        .then(response => {
            mcpm.writePackage(response);

            console.log(chalk.green('mcpm package structure created!'));

            process.exit();
        })
        .catch(error => {
            if (error) {
                // TODO: Move to mcpm in a handleErrors method?
                switch (error.code) {
                    case errorCodes.NoArgs:
                    case errorCodes.InvalidAction:
                        mcpm.printUsage();
                        process.exit();
                    default:
                        console.error(e);
                        process.exit();
                }
            }
        });
}

run();
