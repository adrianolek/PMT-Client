'use strict';

angular.module('pmtClient.projects', ['ngRoute', 'ngResource'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {templateUrl: 'projects/projects.html', controller: 'ProjectsCtrl'});
  }])

  .controller('ProjectsCtrl', ['$scope', 'ApiClient', function ($scope, ApiClient) {
    ApiClient.projects().query({}, function(res){
      $scope.projects = res.projects;
    });
  }]);
