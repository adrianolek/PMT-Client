'use strict';

describe('LoginCtrl', function () {
  var $scope, $controller, ApiClient, Tracker, window;

  beforeEach(module('pmtClient.login'));

  beforeEach(function () {
    window = {
      chrome: {
        storage: {
          local: {
            set: function () {},
            get: function () {},
            remove: function () {}
          }
        }
      }
    };

    ApiClient = {
      forget: function () {}
    };

    Tracker = {
      stop: function () {}
    };

    module(function ($provide) {
      $provide.value('$window', window);
      $provide.value('ApiClient', ApiClient);
      $provide.value('Tracker', Tracker);
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('LoginCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));

  it('form should be empty', function () {
    expect($scope.url).toBe('');
    expect($scope.login.username).toBe('');
    expect($scope.login.password).toBe('');
    expect($scope.error).toBeUndefined();
  });

  it('empty submit should show error', function(){
    $scope.doLogin();
    expect($scope.error).toBeDefined();
  });
});
