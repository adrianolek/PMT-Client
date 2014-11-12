'use strict';

angular.module('pmtClient', ['ngRoute',
  'ngSanitize',
  'pmtClient.login',
  'pmtClient.services',
  'pmtClient.projects',
  'pmtClient.tasks'])
  .controller('StartCtrl', ['$scope', 'ApiClient', '$location', function ($scope, ApiClient, $location) {
    chrome.storage.local.get('credentials', function(objects){
      var credentials = objects.credentials;
      if(credentials) {
        ApiClient.setToken(credentials.token);
        ApiClient.setUrl(credentials.url);
      }

      $scope.$apply(function(){
        $location.path(ApiClient.hasCredentials() ? 'projects' : 'login');
      });
    });
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {template: ' ', controller: 'StartCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
  }])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$location', function ($location) {
      return {
        'responseError': function (response) {
          if (response.status == 403) {
            $location.path('login');
          }
          return response;
        }
      };
    }]);
  }])
  .filter('html', function () {
    return function (value) {
      if (angular.isString(value)) {
        return value.
          replace(/&/g, '&amp;').
          replace(/[A-z0-9]/, function (value) {
            return '&#' + value.charCodeAt(0) + ';';
          }).
          replace(/</g, '&lt;').
          replace(/>/g, '&gt;');
      }
    }
  })
  .filter('nl2br', function () {
    return function (value) {
      if (angular.isString(value)) {
        return value.replace("\n", '<br/>');
      }
    }
  });
