'use strict';

describe('Tracker', function() {
  beforeEach(module('pmtClient.tracker'));

  beforeEach(function () {
    module('pmtClient.api', function ($provide) {
      $provide.value('ApiClient', {
        track: function () {
          var Track = function(){};
          Track.prototype.$save = function(params){
            this.params = params;
          };
          return Track;
        }
      });
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

  it('time should be 10',  inject(function(Tracker) {
    Tracker.time = -1;
    Tracker.tick();
    expect(Tracker.getTime()).toBe(10);
  }));

  it('should save every 10 seconds',  inject(function(Tracker) {
    Tracker.time = 8;
    spyOn(Tracker, 'save');
    Tracker.tick();
    expect(Tracker.save).not.toHaveBeenCalled();
    Tracker.tick();
    expect(Tracker.save).toHaveBeenCalled();
  }));

  it('status should be idle',  inject(function(Tracker, $rootScope) {
    Tracker.time = -1;
    Tracker.tick();
    expect($rootScope.status).toBe('Idle: 00:00:10');
  }));

  it('should create idle track',  inject(function(Tracker) {
    Tracker.idle();
    expect(Tracker.isIdle).toBe(true);
  }));

  it('should create task track',  inject(function(Tracker) {
    Tracker.task(1);
    expect(Tracker.isIdle).toBe(false);
  }));

  it('status should be working',  inject(function(Tracker, $rootScope) {
    Tracker.task(1);
    Tracker.time = -1;
    Tracker.tick();
    expect($rootScope.status).toBe('Working: 00:00:10');
  }));

  it('should be stopped',  inject(function(Tracker) {
    Tracker.idle();
    Tracker.stop();
    expect(Tracker.track).toBe(null);
  }));

  it('description should be saved',  inject(function(Tracker) {
    Tracker.task(1);
    Tracker.setDescription('foo');
    Tracker.save();
    expect(Tracker.track.description).toBe('foo');
  }));

  it('track should be complete',  inject(function(Tracker) {
    Tracker.task(1);
    Tracker.save(true);
    expect(Tracker.track.params.complete).toBe(1);
  }));
});
