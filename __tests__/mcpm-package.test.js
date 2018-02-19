var McpmPackage = require('../src/models/mcpm-package');

var newFields = {
    name: 'test fill',
    version: '1.0.0',
    description: 'test fill description',
    author: 'Nick DeMayo',
    website: 'https://www.google.com',
    modPath: 'mod.jar',
    minecraftVersion: '1.12.2',
    dependencies: ['forge']
};

describe('McpmPackage', () => {
    it('can init', () => {
        var mcpmPackage = new McpmPackage(
            newFields.name,
            newFields.version,
            newFields.description,
            newFields.author,
            newFields.website,
            newFields.modPath,
            newFields.minecraftVersion,
            newFields.dependencies
        );

        expectPackageProps(mcpmPackage);
    });
    it('can fill fields', () => {
        var mcpmPackage = new McpmPackage();

        mcpmPackage.fill(newFields);

        expectPackageProps(mcpmPackage);
    });
    it('can return questions', () => {
        var mcpmPackage = new McpmPackage();

        var questions = mcpmPackage.getQuestions();

        expect(questions.length).toBeGreaterThan(0);
        expect(questions[0].default).toBe('mcpm');
    });
});

function expectPackageProps(mcpmPackage) {
    expect(mcpmPackage.name).toBe(newFields.name);
    expect(mcpmPackage.version).toBe(newFields.version);
    expect(mcpmPackage.description).toBe(newFields.description);
    expect(mcpmPackage.author).toBe(newFields.author);
    expect(mcpmPackage.website).toBe(newFields.website);
    expect(mcpmPackage.modPath).toBe(newFields.modPath);
    expect(mcpmPackage.minecraftVersion).toBe(newFields.minecraftVersion);
    expect(mcpmPackage.dependencies).toBe(newFields.dependencies);
}
