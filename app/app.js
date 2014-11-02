'use strict';

angular.module('pmtClient', ['ngRoute', 'pmtClient.login'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
