export const mockCreateZip = jest.fn();

const ZipHelper = jest.fn().mockImplementation(() => {
    return {
        createZipSync: mockCreateZip
    };
});

module.exports = ZipHelper;
