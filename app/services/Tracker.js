'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    this.time = -10;

    this.tick = function () {
      this.time += 1;
      $rootScope.status = this.time;
    };

    $interval(this.tick.bind(this), 1000);
  }]);
