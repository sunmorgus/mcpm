var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var minimist = require('minimist');

var PackageRepo = require('./repositories/package-repo');

if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', function() {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function() {
    //graceful shutdown
    process.exit();
});

var Spinner = CLI.Spinner;

function init() {
    clear();
    console.log(
        chalk.green(figlet.textSync('MCPM', { horizontalLayout: 'full' }))
    );
    console.log(chalk.yellow('Welcome to the Minecraft Mod Package Manager!'));
}

function processArgs() {
    var args = minimist(process.argv.slice(2));

    if (args._.length === 0 || args._.length > 1) {
        // TODO: Print usage
        console.log(chalk.red('You must specify a command: new, install, etc'));
        process.exit();
    }

    var packageRepo = new PackageRepo();

    if (args._[0] === 'new') {
        if (
            typeof args.packageName === 'undefined' ||
            typeof args.modPath === 'undefined'
        ) {
            // Show the menu
        }

        var packageName = args.packageName;
        var modPath = args.modPath;

        packageRepo.createPackage(packageName, modPath);
    }
}

init();
processArgs();
