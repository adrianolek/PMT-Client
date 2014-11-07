'use strict';

angular.module('pmtClient', ['ngRoute', 'pmtClient.login', 'pmtClient.services', 'pmtClient.projects'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
