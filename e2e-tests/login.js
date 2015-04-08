'use strict';

describe('login', function() {

  beforeEach(function() {
    browser.get('/');
  });

  it('should show login page', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/login');
  });
});
