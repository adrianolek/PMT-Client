'use strict';

describe('ProjectCtrl', function () {
  var $scope, $controller, ApiClient, Tracker;

  beforeEach(module('pmtClient.projects'));

  beforeEach(function () {
    ApiClient = {};

    Tracker = {};

    module(function ($provide) {
      $provide.value('ApiClient', ApiClient);
      $provide.value('Tracker', Tracker);
    })
  });

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_('ProjectsCtrl', {$scope: $scope, ApiClient: ApiClient, Tracker: Tracker});
  }));
});
