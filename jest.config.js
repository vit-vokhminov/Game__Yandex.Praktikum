module.exports = {
    testMatch: ['**/spec/**/*.spec.js'],
    testEnvironment: 'jsdom',
    roots: [
        '<rootDir>/src/',
        '<rootDir>/app/',
    ],
    modulePaths: [
        '<rootDir>',
        '<rootDir>/src',
        '<rootDir>/app',
    ],
    setupFiles: [
        '<rootDir>/config/enzyme',
        '<rootDir>/config/runtime',
    ],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [
        '<rootDir>/configs',
        '<rootDir>/src/assets',
    ],
    moduleNameMapper: {
        '^.+\\.css$': 'identity-obj-proxy',
    },
};
