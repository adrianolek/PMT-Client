'use strict';

describe('login', function() {

  browser.get('/');

  it('should show login page', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/login');
  });
});
