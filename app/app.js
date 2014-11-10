'use strict';

angular.module('pmtClient', ['ngRoute',
  'ngSanitize',
  'pmtClient.login',
  'pmtClient.services',
  'pmtClient.projects',
  'pmtClient.tasks'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
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
