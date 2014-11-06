'use strict';

angular.module('pmtClient', ['ngRoute', 'pmtClient.login', 'pmtClient.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
