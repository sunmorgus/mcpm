const answers = {
    name: 'test fill',
    version: '1.0.0',
    description: 'test fill description',
    author: 'Nick DeMayo',
    website: 'https://www.google.com',
    modPath: 'mod.jar',
    minecraftVersion: '1.12.2',
    dependencies: ['forge']
};

const mockPrompt = jest.fn(() => Promise.resolve(answers));

module.exports = {
    answers: answers,
    prompt: mockPrompt
};
