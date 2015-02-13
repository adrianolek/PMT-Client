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
      forget: function () {},
      login: function() {
        return {
          query: function() {}
        };
      },
      setUrl: function() {},
      setToken: function(token){
        this.token = token;
      }
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
    expect($scope.error).not.toBe('');
  });

  it('submit should info message', function(){
    $scope.url = 'http://foo';
    $scope.login = {
      username: 'foo',
      password: 'bar'
    };
    $scope.doLogin();
    expect($scope.error).toBe('');
    expect($scope.info).not.toBe('');
  });

  it('should store login token', function(){
    ApiClient.login = function () {
      return {
        query: function (login, cb) {
          cb({token: 'baz'});
        }
      };
    };
    $scope.url = 'http://foo';
    $scope.login = {
      username: 'foo',
      password: 'bar'
    };
    $scope.remember = true;
    $scope.doLogin();
    expect(ApiClient.token).toBe('baz');
  });

  it('should show invalid message', function(){
    ApiClient.login = function () {
      return {
        query: function (login, cb, errorCb) {
          errorCb({status: 403});
        }
      };
    };
    $scope.url = 'http://foo';
    $scope.doLogin();
    expect($scope.error).toBe('Invalid username or password.');
  });

  it('should show url error', function(){
    ApiClient.login = function () {
      return {
        query: function (login, cb, errorCb) {
          errorCb({status: 500});
        }
      };
    };
    $scope.url = 'http://foo';
    $scope.doLogin();
    expect($scope.error).toBe('The url does not seem to be a PMT app.');
  });
});
