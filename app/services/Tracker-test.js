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
});
