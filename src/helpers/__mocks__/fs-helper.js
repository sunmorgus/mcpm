const mockWriteFolder = jest.fn().mockReturnValue(true);
const mockWriteMcpmPackage = jest.fn().mockReturnValue(true);
const mockCopyFile = jest.fn(() => Promise.resolve(true));

module.exports = {
    writeFolder: mockWriteFolder,
    writeMcpmPackage: mockWriteMcpmPackage,
    copyFile: mockCopyFile
};
