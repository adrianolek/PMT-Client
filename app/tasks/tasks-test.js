'use strict';

describe('IndexCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.tasks'));

  beforeEach(function () {
    ApiClient = {};

    Tracker = {};

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
});
