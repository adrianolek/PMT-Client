'use strict';

angular.module('pmtClient.login', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'login/login.html', controller: 'LoginCtrl'});
  }])

  .controller('LoginCtrl', ['$scope', '$window', 'ApiClient', '$location', 'Tracker',
    function ($scope, $window, ApiClient, $location, Tracker) {
    Tracker.stop();
    ApiClient.forget();
    $window.chrome.storage.local.remove('credentials');

    $scope.url = '';
    $scope.login = {
      username: '',
      password: ''
    };

    $scope.doLogin = function () {
      if (!$scope.url.match(/^https?:\/\/.+/)) {
        $scope.info = '';
        $scope.error = 'Url is invalid.';
      } else {
        $scope.info = 'Logging in...';
        $scope.error = '';

        ApiClient.setUrl($scope.url);
        ApiClient.login().query($scope.login, function (user) {
          $scope.info = 'Logged in.';
          $scope.error = '';
          ApiClient.setToken(user.token);
          /* istanbul ignore else */
          if ($scope.remember) {
            $window.chrome.storage.local.set({'credentials': {'token': user.token, 'url': $scope.url}});
          }
          $location.path('projects');
        }, function (response) {
          $scope.info = '';
          if (response.status == 403) {
            $scope.error = 'Invalid username or password.'
          } else {
            $scope.error = 'The url does not seem to be a PMT app.'
          }
        });
      }
    }
  }]);
