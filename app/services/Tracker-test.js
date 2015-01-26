'use strict';

describe('Tracker', function() {
  beforeEach(module('pmtClient.tracker'));

  beforeEach(function () {
    module('pmtClient.api', function ($provide) {
      $provide.value('ApiClient', {});
    });
  });

  it('time should be negative',  inject(function(Tracker) {
    expect(Tracker.getTime()).toBe(-10);
  }));

  it('description should be set',  inject(function(Tracker) {
    Tracker.setDescription('foo');
    expect(Tracker.description).toBe('foo');
  }));

  it('description should be valid',  inject(function(Tracker) {
    Tracker.setDescription('foo bar baz bar foo');
    expect(Tracker.isDescriptionValid()).toBe(true);
  }));

  it('description should be invalid',  inject(function(Tracker) {
    Tracker.setDescription('foo bar baz');
    expect(Tracker.isDescriptionValid()).toBe(false);
  }));

  it('time should advance',  inject(function(Tracker) {
    Tracker.tick();
    expect(Tracker.getTime()).toBe(-9);
  }));

  it('status should be waiting',  inject(function(Tracker, $rootScope) {
    Tracker.tick();
    expect($rootScope.status).toBe('Waiting: 9');
  }));
});
