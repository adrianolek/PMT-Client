'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    this.time = -10;

    this.tick = function () {
      this.time += 1;

      if (this.time < 0) {
        $rootScope.status = 'Waiting: ' + Math.abs(this.time);
      } else {
        $rootScope.status = 'Idle: ' + this.time;
      }

    };

    $interval(this.tick.bind(this), 1000);
  }]);
