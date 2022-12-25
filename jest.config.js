module.exports = {
    "testEnvironment": "node",
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "testMatch": [
        "<rootDir>/test/**/*.spec.ts"
    ],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/"
    ]
};
