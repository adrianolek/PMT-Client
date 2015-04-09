exports.config = {
  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine2',

  baseUrl: 'http://localhost:8000/'
};
