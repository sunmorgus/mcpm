const mockWriteFolder = jest.fn().mockReturnValue(true);
const mockWriteMcpmPackage = jest.fn().mockReturnValue(true);

module.exports = {
    writeFolder: mockWriteFolder,
    writeMcpmPackage: mockWriteMcpmPackage
};
