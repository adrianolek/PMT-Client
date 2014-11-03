'use strict';

angular.module('pmtClient.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'login/login.html', controller: 'LoginCtrl'});
  }])

  .controller('LoginCtrl', ['$scope', function ($scope) {
    $scope.login = function () {
      $scope.error = 'Login error';
    }
  }]);
