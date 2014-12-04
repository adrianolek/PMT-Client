'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    this.time = -10;
    this.taskId = null;
    this.track = null;

    this.tick = function () {
      this.time += 1;

      if (this.time < 0) {
        $rootScope.status = 'Waiting: ' + Math.abs(this.time);
      } else {
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

    this.save = function () {
      if (this.track) {
        this.track.$save();
      }
    };

    this.idle = function () {
      if (this.taskId) {
        this.taskId = null;
        this.time = -10;
        this.track = new ApiClient.track();
      }
    };

    this.task = function (id) {
      this.taskId = id;
      this.time = -10;
      this.track = new ApiClient.track({taskId: id});
    };

    $interval(this.tick.bind(this), 1000);
  }]);
