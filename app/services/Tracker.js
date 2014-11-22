'use strict';

angular.module('pmtClient.tracker', []).
  service('Tracker', ['$interval', '$rootScope', 'ApiClient', function ($interval, $rootScope, ApiClient) {
    var time = -10;

    $interval(function(){
      time += 1;
      $rootScope.status = time;
    }, 1000);
  }]);
