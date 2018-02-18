const PackageRepo = require('../src/repositories/package-repo');

console.log = jest.fn();

const testDir = '/Users/nicklasdemayo/Downloads/minecraft';
const testFile =
    '/Users/nicklasdemayo/Downloads/minecraft/liteloader-installer-1.12.2-00-SNAPSHOT.jar';

describe('Package Repo', () => {
    describe('Create Package', () => {
        // TODO: Mock fs so that we don't actually write out an archive
        it('can create package from file', () => {
            var packageRepo = new PackageRepo();

            packageRepo.createPackage('testFile', testFile);
        });

        it('can create package from folder', () => {
            var packageRepo = new PackageRepo();

            packageRepo.createPackage('testFolder', testDir);
        });

        it('throws error when packageName is undefined', () => {
            var packageRepo = new PackageRepo();

            expect(() => {
                packageRepo.createPackage(undefined, testDir);
            }).toThrow({ message: 'PackageName is required' });
        });

        it('throws error when modPath is undefined', () => {
            var packageRepo = new PackageRepo();

            expect(() => {
                packageRepo.createPackage('undefined mod path', undefined);
            }).toThrow({ message: 'ModPath is required' });
        });
    });
});
