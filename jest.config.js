module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', {
      // Disable TypeScript diagnostics — avoids TS2589 "type instantiation
      // excessively deep" on LangChain DynamicStructuredTool generics
      diagnostics: false,
    }],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // Run tests serially to avoid OOM with heavy LangChain/LangGraph imports
  maxWorkers: 1,
  workerIdleMemoryLimit: '512MB',
  forceExit: true,
};