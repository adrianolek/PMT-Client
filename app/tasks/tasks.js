'use strict';

angular.module('pmtClient.tasks', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project/:projectId/tasks', {templateUrl: 'tasks/index.html', controller: 'IndexCtrl'});
    $routeProvider.when('/project/:projectId/task/:taskId', {templateUrl: 'tasks/show.html', controller: 'ShowCtrl'});
  }])

  .controller('IndexCtrl', ['$scope', 'ApiClient', '$routeParams', function ($scope, ApiClient, $routeParams) {
    ApiClient.tasks().query($routeParams, function (res) {
      $scope.project = res.project;
      $scope.tasks = res.tasks;
    });
  }])

  .controller('ShowCtrl', ['$scope', 'ApiClient', '$routeParams', '$location',
    function ($scope, ApiClient, $routeParams, $location) {
    ApiClient.tasks().get($routeParams, function (res) {
      $scope.project = res.project;
      $scope.task = res.task;
    });

    $scope.finish = function () {
      $location.path('project/' + $scope.project.id + '/tasks');
    };
  }]);
