'use strict';

describe('ProjectCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.projects'));

  beforeEach(function () {
    ApiClient = {
      projects: function() {
        return {
          query: function(params, cb) {
            cb({projects: 'foo'})
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
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('ProjectsCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));

  it('should load projects', function(){
    expect($scope.projects).toBe('foo');
  });

  it('it should track idle', function(){
    expect(Tracker.idle).toHaveBeenCalled();
  });
});
