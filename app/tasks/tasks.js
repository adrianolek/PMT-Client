'use strict';

angular.module('pmtClient.tasks', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project/:projectId/tasks', {templateUrl: 'tasks/index.html', controller: 'IndexCtrl'});
    $routeProvider.when('/project/:projectId/task/:taskId', {templateUrl: 'tasks/show.html', controller: 'ShowCtrl'});
    $routeProvider.when('/project/:projectId/task/:taskId/estimate', {templateUrl: 'tasks/estimate.html', controller: 'EstimateCtrl'});
  }])

  .controller('IndexCtrl', ['$scope', 'ApiClient', '$routeParams', 'Tracker',
    function ($scope, ApiClient, $routeParams, Tracker) {
    Tracker.idle();
    $scope.refresh = function(){
      ApiClient.tasks().query($routeParams, function (res) {
        $scope.project = res.project;
        $scope.tasks = res.tasks;
      });
    };

    $scope.refresh();
  }])

  .controller('ShowCtrl', ['$scope', 'ApiClient', '$routeParams', '$location', 'Tracker',
    function ($scope, ApiClient, $routeParams, $location, Tracker) {
    ApiClient.tasks().get($routeParams, function (res) {
      if (res.task.estimatedTime == 0) {
        $location.path('project/' + $routeParams.projectId + '/task/' + $routeParams.taskId + '/estimate');
        return;
      }

      Tracker.task($routeParams.taskId);
      $scope.project = res.project;
      $scope.task = res.task;
    });

    $scope.$watch('description', function(value){
      Tracker.setDescription(value);
    });

    $scope.finish = function () {
      $location.path('project/' + $scope.project.id + '/tasks');
    };
  }])
  .controller('EstimateCtrl', ['$scope', '$routeParams', '$location', 'ApiClient', 'Tracker',
    function ($scope, $routeParams, $location, ApiClient, Tracker) {
    Tracker.idle();
    ApiClient.tasks().get($routeParams, function (res) {
      $scope.project = res.project;
      $scope.task = res.task;
      $scope.estimate = res.task.estimatedTime;

      $scope.save = function () {
        if ($scope.estimate > 0) {
          res.time = $scope.estimate;
          res.$estimate({taskId: $scope.task.id}, function () {
            $location.path('project/' + $routeParams.projectId + '/task/' + $routeParams.taskId);
          });
        }
      };
    });
  }]);
