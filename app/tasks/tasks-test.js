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
      idle: jasmine.createSpy('idle')
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

  it('it should track idle', function(){
    expect(Tracker.idle).toHaveBeenCalled();
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
      task: function(){},
      getTime: function(){ return 120; },
      isDescriptionValid: function() { return false }
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

  it('should show finish error', function(){
    $scope.finish();
    expect($scope.error).toBe(true);
  });

  it('should redirect after finish', inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    Tracker = {
      task: function(){},
      save: function(){},
      getTime: function(){ return 120; },
      isDescriptionValid: function() { return true }
    };
    var location = {
      path: function(p){
        expect(p).toMatch(/tasks$/);
      }
    };
    $controller = _$controller_('ShowCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker, $location: location});
    $scope.finish();
  }));

  it('should set tracker description', function(){
    $scope.description = 'foo';
    Tracker.setDescription = function(val){
      expect(val).toBe('foo');
    };
    $scope.$digest();
  });
});

describe('EstimateCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.tasks'));

  beforeEach(function () {
    ApiClient = {
      tasks: function () {
        return {
          get: function (params, cb) {
            cb({
              project: 'foo',
              task: {
                estimatedTime: 0
              },
              $estimate: function (params, cb) {
                cb();
              }
            })
          }
        };
      }
    };

    Tracker = {
      idle: function(){}
    };

    module(function ($provide) {
      $provide.value('ApiClient', ApiClient);
      $provide.value('Tracker', Tracker);
      $provide.value('$routeParams', {});
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('EstimateCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));

  it('should load estimated time', function(){
    expect($scope.estimate).toBe(0);
  });

  it('should display error', function(){
    $scope.save();
    expect($scope.error).toBe(true);
  });

  it('should save estimated time', function(){
    $scope.estimate = 60;
    $scope.save();
    expect($scope.error).toBeUndefined();
  });
});
