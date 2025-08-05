module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use babel-jest for JSX/ES6
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Allow axios to be transformed
  ],
  
  
};


