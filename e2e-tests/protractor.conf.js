exports.config = {
  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions':{
      'args': ['load-and-launch-app=.']
    }
  },

  framework: 'jasmine2',

  baseUrl: 'http://localhost:8000/'
};
