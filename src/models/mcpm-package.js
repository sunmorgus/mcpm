var fs = require('fs');
var path = require('path');
var os = require('os');

class McpmPackage {
    constructor(
        name,
        version,
        description,
        author,
        website,
        modPath,
        minecraftVersion,
        dependencies
    ) {
        this.name = name || null;
        this.version = version || null;
        this.description = description || null;
        this.author = author || null;
        this.website = website || null;
        this.modPath = modPath || null;
        this.minecraftVersion = minecraftVersion || null;
        this.dependencies = dependencies || null;
    }

    /**
     * Returns inquirer questions for McpmPackage
     */
    getQuestions() {
        var questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Mod Name',
                default: path.basename(process.cwd())
            },
            {
                type: 'input',
                name: 'version',
                message: 'Mod Version',
                default: '1.0.0',
                validate: function(value) {
                    var pass = value.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/i);
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid version';
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description',
                default: ''
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author',
                default: os.userInfo().username
            },
            {
                type: 'input',
                name: 'website',
                message: 'Mod Website',
                default: '',
                validate: function(value) {
                    var pass = value.match(
                        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
                    );
                    if (pass || value === '') {
                        return true;
                    }

                    return 'Please enter a valid URL';
                }
            },
            {
                type: 'path',
                name: 'modPath',
                message: 'Path to Mod *.jar file',
                default: os.userInfo().homedir,
                validate: function(value) {
                    if (path.extname(value) !== '.jar') {
                        return 'You must choose a .jar file';
                    }

                    if (!fs.existsSync(value)) {
                        return 'Path does not exist';
                    }

                    return true;
                }
            },
            {
                type: 'input',
                name: 'minecraftVersion',
                message: 'Mod Minecraft Version',
                default: '1.12.2',
                validate: function(value) {
                    var pass = value.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/i);
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid version';
                }
            },
            {
                type: 'confirm',
                name: 'hasDependencies',
                message: 'Does your mod have any dependencies (i.e. Forge)?',
                default: true
            },
            {
                type: 'checkbox',
                name: 'dependencies',
                message: 'Dependencies',
                when: function(answers) {
                    return answers.hasDependencies;
                },
                choices: [
                    {
                        name: 'forge'
                    }
                ],
                validate: function(value) {
                    if (value.length >= 1) {
                        return true;
                    }

                    return 'You must choose at least one dependency';
                }
            }
        ];

        return questions;
    }

    /**
     * Fills this with values from another object
     * @param {Object} newFields object containing values for this
     */
    fill(newFields) {
        for (var field in newFields) {
            if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
                if (this[field] !== 'undefined') {
                    this[field] = newFields[field];
                }
            }
        }
    }
}

module.exports = McpmPackage;
