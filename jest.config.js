'use strict';

const { compose, baseConfig } = require('@moxy/jest-config-base');
const { withEnzymeWeb } = require('@moxy/jest-config-enzyme');

module.exports = compose(
    baseConfig(),
    withEnzymeWeb('enzyme-adapter-react-16'), // ⚠️ Always after .withWeb
    (config) => {
        const { setupFilesAfterEnv = [] } = config;

        config.setupFilesAfterEnv = [
            ...setupFilesAfterEnv,
            './jest.setup.js',
        ];

        return config;
    },
);
