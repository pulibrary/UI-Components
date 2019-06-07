const path = require("path")

module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["<rootDir>/test/unit/setup"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
  testPathIgnorePatterns: [
    "<rootDir>/test/unit/gallery-store-config.spec.js",
    "<rootDir>/test/unit/resource-store-config.spec.js",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/ExampleComponent.js",
    "<rootDir>/src/elements/*.{js,vue}",
    "<rootDir>/src/patterns/*.{js,vue}",
    "<rootDir>/src/util/**/*.{js,vue}",
    "<rootDir>/docs/**/*.{js,vue}",
    "!<rootDir>/src/main.js",
    "!<rootDir>/src/router/index.js",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/src/system.js",
    "!<rootDir>/docs/docs.helper.js",
    "!<rootDir>/docs/components/status/*",
    "!<rootDir>/docs/components/Preview.js",
    "!<rootDir>/docs/utils/tabs.js",
    "!<rootDir>/test/unit/gallery-store-config.spec.js",
    "!<rootDir>/test/unit/resource-store-config.spec.js",
  ],
}
