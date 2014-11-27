'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    this.time = -10;
    this.taskId = null;

    this.tick = function () {
      this.time += 1;

      if (this.time < 0) {
        $rootScope.status = 'Waiting: ' + Math.abs(this.time);
      } else {
        var hours = Math.floor(this.time / 3600);
        var minutes = Math.floor((this.time - hours * 3600) / 60);
        var seconds = this.time - hours * 3600 - minutes * 60;

        $rootScope.status = 'Idle: ' + sprintf('%02d:%02d:%02d', hours, minutes, seconds);
      }

    };

    this.idle = function () {
      if (this.taskId) {
        this.taskId = null;
        this.time = -10;
      }
    };

    this.task = function (id) {
      this.taskId = id;
      this.time = -10;
    };

    $interval(this.tick.bind(this), 1000);
  }]);
