'use strict';
var switchWindow = require('./switchWindow');

describe('login', function() {

  beforeAll(switchWindow);

  it('should show login page', function() {
    expect(browser.getLocationAbsUrl()).toBe('/login');
  });

  it('empty submit should show error', function() {
    element(by.buttonText('Sign in')).click();
    expect(element(by.binding('error')).isDisplayed()).toBe(true);
  });
});
