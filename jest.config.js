module.exports = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/utils/**/*.{js,vue}',
    '!src/utils/auth.js',
    '!src/utils/request.js',
    '!src/utils/get-page-title.js',
    '!src/utils/rep-error-code.js',
    '!src/utils/set-request-address.js',
    'src/components/SvgIcon/*.{js,vue}',
    '!src/view/login/*.{js,vue}'
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: './tests/coverage',
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', '/mock/'],
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue', 'node'],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@images/(.*)$': '<rootDir>/src/assets/images/$1'
  },
  preset: 'ts-jest',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: ['jest-serializer-vue'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['!node_modules/']
  // transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
}
