export const mockCreateZip = jest.fn();

const ZipHelper = jest.fn().mockImplementation(() => {
    return {
        createZip: mockCreateZip
    };
});

module.exports = ZipHelper;
