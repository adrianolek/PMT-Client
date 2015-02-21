'use strict';

describe('IndexCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.tasks'));

  beforeEach(function () {
    ApiClient = {
      tasks: function() {
        return {
          query: function(params, cb) {
            cb({project: 'foo', tasks: 'bar'})
          }
        };
      }
    };

    Tracker = {
      idle: function() {}
    };

    module(function ($provide) {
      $provide.value('ApiClient', ApiClient);
      $provide.value('Tracker', Tracker);
      $provide.value('$routeParams', {});
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('IndexCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));

  it('should load tasks', function(){
    expect($scope.project).toBe('foo');
    expect($scope.tasks).toBe('bar');
  });
});

describe('ShowCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.tasks'));

  beforeEach(function () {
    ApiClient = {
      tasks: function() {
        return {
          get: function(params, cb) {
            cb({project: 'foo',
              task: {
                name: 'bar'
              }})
          }
        };
      }
    };

    Tracker = {
      task: function(){}
    };

    module(function ($provide) {
      $provide.value('ApiClient', ApiClient);
      $provide.value('Tracker', Tracker);
      $provide.value('$routeParams', {});
      $provide.value('$location', {});
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('ShowCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));

  it('should load task', function(){
    expect($scope.project).toBe('foo');
    expect($scope.task.name).toBe('bar');
  });

  it('should redirect to estimate', inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    ApiClient.tasks = function() {
      return {
        get: function(params, cb) {
          cb({project: 'foo',
            task: {
              estimatedTime: 0
            }});
        }
      };
    };
    var location = {
      path: function(p){
        expect(p).toMatch(/estimate$/);
      }
    };
    $controller = _$controller_('ShowCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker, $location: location});
  }));
});
