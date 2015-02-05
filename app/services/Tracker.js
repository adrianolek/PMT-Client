'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    this.time = -10;
    this.taskId = null;
    this.isIdle = false;
    this.track = null;
    this.description = '';

    this.getTime = function () {
      return this.time;
    };

    this.isDescriptionValid = function() {
      return this.description
        .replace(/[^\w]/g, ' ')
        .replace(/\b\w\b/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .length > 4;
    };

    this.tick = function () {
      this.time += 1;

      if (this.time < 0) {
        $rootScope.status = 'Waiting: ' + Math.abs(this.time);
      } else {
        /* istanbul ignore else */
        if (this.time == 0) {
          this.time = 10;
        }

        var hours = Math.floor(this.time / 3600);
        var minutes = Math.floor((this.time - hours * 3600) / 60);
        var seconds = this.time - hours * 3600 - minutes * 60;

        var description = this.taskId ? 'Working: ' : 'Idle: ';
        $rootScope.status = description + sprintf('%02d:%02d:%02d', hours, minutes, seconds);
      }

      if (this.time % 10 == 0) {
        this.save();
      }
    };

    this.setDescription = function (value) {
      this.description = value;
    };

    this.save = function (complete) {
      if (this.track) {
        this.track.description = this.description;
        var params = complete ? {complete: 1} : {};
        this.track.$save(params);
      }
    };

    this.stop = function () {
      this.taskId = null;
      this.isIdle = false;
      this.track = null;
      this.description = '';
    };

    this.newTrack = function (id) {
      this.time = -10;
      this.taskId = id;
      this.isIdle = !id;
      this.description = '';
      var Track = ApiClient.track();
      this.track = new Track({taskId: id});
    };

    this.idle = function () {
      /* istanbul ignore else */
      if (!this.isIdle) {
        this.newTrack()
      }
    };

    this.task = function (id) {
      this.newTrack(id);
    };

    $interval(this.tick.bind(this), 1000);
  }]);
