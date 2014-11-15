'use strict';

angular.module('pmtClient.tasks', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project/:projectId/tasks', {templateUrl: 'tasks/index.html', controller: 'IndexCtrl'});
    $routeProvider.when('/project/:projectId/task/:taskId', {templateUrl: 'tasks/show.html', controller: 'ShowCtrl'});
    $routeProvider.when('/project/:projectId/task/:taskId/estimate', {templateUrl: 'tasks/estimate.html', controller: 'EstimateCtrl'});
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
      if (res.task.estimatedTime == 0) {
        $location.path('project/' + $routeParams.projectId + '/task/' + $routeParams.taskId + '/estimate');
        return;
      }

      $scope.project = res.project;
      $scope.task = res.task;
    });

    $scope.finish = function () {
      $location.path('project/' + $scope.project.id + '/tasks');
    };
  }])
  .controller('EstimateCtrl', ['$scope', '$routeParams', '$location', 'ApiClient',
    function ($scope, $routeParams, $location, ApiClient) {
    ApiClient.tasks().get($routeParams, function (res) {
      $scope.project = res.project;
      $scope.task = res.task;
      $scope.estimate = res.task.estimatedTime;
    });

    $scope.save = function () {
      if ($scope.estimate > 0) {
        $location.path('project/' + $routeParams.projectId + '/task/' + $routeParams.taskId);
      }
    };
  }]);
