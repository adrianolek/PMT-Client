'use strict';

angular.module('pmtClient.login', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'login/login.html', controller: 'LoginCtrl'});
  }])

  .factory('LoginResource', ['$resource',
    function ($resource) {
      return $resource('/api/token.json', {}, {
        query: {method: 'POST'}
      });
    }])

  .controller('LoginCtrl', ['$scope', 'LoginResource', function ($scope, LoginResource) {
    $scope.url = '';
    $scope.login = {
      username: '',
      password: ''
    };

    $scope.doLogin = function () {
      if (!$scope.url.match(/^https?:\/\/.+/)) {
        $scope.info = '';
        $scope.error = 'Url is invalid';
      } else {
        $scope.info = 'Logging in...';
        $scope.error = '';

        LoginResource.query($scope.login, function (user) {
          $scope.info = '';
          if (user.token) {
            $scope.error = '';
          } else {
            $scope.error = 'Invalid username or password.'
          }
        });
      }
    }
  }]);
