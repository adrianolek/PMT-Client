'use strict';

angular.module('pmtClient.tasks', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project/:projectId/tasks', {templateUrl: 'tasks/index.html', controller: 'IndexCtrl'});
  }])

  .controller('IndexCtrl', ['$scope', 'ApiClient', '$routeParams', function ($scope, ApiClient, $routeParams) {
    ApiClient.tasks().query($routeParams, function (res) {
      $scope.project = res.project;
      $scope.tasks = res.tasks;
    });
  }]);
