var mcpm = require('../src/core/mcpm');
var errorCodes = require('../src/globals/error-codes');

var mockInquirerHelper = require('../src/helpers/__mocks__/inquirer-helper');
jest.mock('../src/helpers/inquirer-helper');

jest.mock('../src/helpers/fs-helper');

console.log = jest.fn();
var defaultArgs = ['/usr/local/bin/node', 'index.js'];

describe('MCMP', () => {
    describe('Init', () => {
        it('no args rejects', () => {
            expect.assertions(1);
            return expect(mcpm.getMcpmPackage(defaultArgs)).rejects.toEqual({
                message: 'No arguments provided',
                code: 0
            });
        });
        it('invalid action rejects', () => {
            defaultArgs[2] = 'invalid';

            expect.assertions(1);
            return expect(mcpm.getMcpmPackage(defaultArgs)).rejects.toEqual({
                message: 'Invalid action provided',
                code: 1
            });
        });
        it('gets mcpmPackage', () => {
            defaultArgs[2] = 'init';

            expect.assertions(8);
            return mcpm.getMcpmPackage(defaultArgs).then(response => {
                expectPackageProps(response, mockInquirerHelper.answers);
            });
        });
        it('writes package structure', () => {
            expect.assertions(2);
            return mcpm.getMcpmPackage(defaultArgs).then(response => {
                expect(response.name).toBe(mockInquirerHelper.answers.name);

                var created = mcpm.writePackage(response);
                expect(created).toBeTruthy();
            });
        });
    });
});

function expectPackageProps(mcpmPackage, answers) {
    expect(mcpmPackage.name).toBe(answers.name);
    expect(mcpmPackage.version).toBe(answers.version);
    expect(mcpmPackage.description).toBe(answers.description);
    expect(mcpmPackage.author).toBe(answers.author);
    expect(mcpmPackage.website).toBe(answers.website);
    expect(mcpmPackage.modPath).toBe(answers.modPath);
    expect(mcpmPackage.minecraftVersion).toBe(answers.minecraftVersion);
    expect(mcpmPackage.dependencies).toEqual(answers.dependencies);
}
