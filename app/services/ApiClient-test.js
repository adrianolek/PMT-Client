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

  it('url and token should be forgotten',  inject(function(ApiClient) {
    ApiClient.setUrl('foo');
    ApiClient.setToken('foo');
    ApiClient.forget();
    expect(ApiClient.getUrl()).toBe('');
    expect(ApiClient.getToken()).toBe('');
  }));

  it('should not have credentials',  inject(function(ApiClient) {
    expect(ApiClient.hasCredentials()).toBeFalsy();
  }));
});
