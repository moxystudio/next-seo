const { compose, baseConfig, withEnzyme } = require('@moxy/jest-config');

module.exports = compose([
    baseConfig,
    withEnzyme('enzyme-adapter-react-16'),
    (config) => {
        const { setupFilesAfterEnv = [] } = config;

        config.setupFilesAfterEnv = [
            ...setupFilesAfterEnv,
            './jest.setup.js',
        ];

        return config;
    },
]);
