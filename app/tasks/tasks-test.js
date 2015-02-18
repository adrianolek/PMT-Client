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
