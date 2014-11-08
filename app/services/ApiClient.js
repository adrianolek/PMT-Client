'use strict';

angular.module('pmtClient.services', ['ngResource']).
  service('ApiClient', ['$resource', function ($resource) {
    this.url = '';
    this.token = '';

    this.setUrl = function (value) {
      this.url = value;
    };

    this.getUrl = function () {
      return this.url;
    };

    this.setToken = function (value) {
      this.token = value;
    };

    this.getToken = function () {
      return this.token;
    };

    this.forget = function () {
      this.url = '';
      this.token = '';
    };

    this.login = function () {
      return $resource(this.getUrl() + '/api/token.json', {}, {
        query: {method: 'POST'}
      });
    };

    this.projects = function () {
      return $resource(this.getUrl() + '/api/project.json', {}, {
        query: {method: 'GET', headers: {'X-Auth-Token': this.getToken()}}
      });
    };
  }]);
