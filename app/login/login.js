'use strict';

angular.module('pmtClient.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'login/login.html', controller: 'LoginCtrl'});
  }])

  .controller('LoginCtrl', ['$scope', function ($scope) {
    $scope.login = function () {
      if (!$scope.login.url || !$scope.login.url.match(/^https?:\/\/.+/)) {
        $scope.info = '';
        $scope.error = 'Url is invalid';
      } else {
        $scope.info = 'Logging in...';
        $scope.error = '';
      }
    }
  }]);
