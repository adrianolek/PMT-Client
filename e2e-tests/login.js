'use strict';
var switchWindow = require('./switchWindow');

describe('login', function() {

  beforeAll(switchWindow);

  it('should show login page', function() {
    expect(browser.getLocationAbsUrl()).toBe('/login');
  });
});
