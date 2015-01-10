'use strict';

describe('API Client', function() {
  beforeEach(module('pmtClient.api'));

  it('url should be set',  inject(function(ApiClient) {
    ApiClient.setUrl('foo');
    expect(ApiClient.getUrl()).toBe('foo');
  }));

  it('token should be set',  inject(function(ApiClient) {
    ApiClient.setToken('foo');
    expect(ApiClient.getToken()).toBe('foo');
  }));
});
