const archiver = jest.fn().mockImplementation((format, options) => {
    return {
        on: jest.fn(),
        pipe: jest.fn(),
        finalize: jest.fn(),
        directory: jest.fn(),
        append: jest.fn()
    };
});

module.exports = archiver;
