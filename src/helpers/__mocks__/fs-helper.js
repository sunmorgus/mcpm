const mockWriteFolder = jest.fn().mockReturnValue(true);
const mockWriteMcpmPackage = jest.fn().mockReturnValue(true);
const mockCopyFile = jest.fn(() => Promise.resolve(true));

module.exports = {
    writeFolderSync: mockWriteFolder,
    writeMcpmPackageSync: mockWriteMcpmPackage,
    copyFile: mockCopyFile
};
