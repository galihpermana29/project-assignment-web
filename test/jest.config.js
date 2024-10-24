module.exports = {
    rootDir: "../",
    collectCoverage: true,
    coveragePathIgnorePatterns: ["<rootDir>/test/"],
    passWithNoTests: true,
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/pages/**/*.test.[jt]s?(x)",
        "<rootDir>/src/**/*.test.[jt]s?(x)",
    ],
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/.next/",
        "<rootDir>/node_modules/",
        "<rootDir>/cypress/",
        "<rootDir>/webdriverio/",
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.js",
        "^@/(.*)$": "<rootDir>/src/$1", // Example alias mapping
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
};
