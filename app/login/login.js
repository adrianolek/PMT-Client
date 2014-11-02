'use strict';

angular.module('pmtClient.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'login/login.html', controller: 'LoginCtrl'});
  }])

  .controller('LoginCtrl', [function () {

  }]);
