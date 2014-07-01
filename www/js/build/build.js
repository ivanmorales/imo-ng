"use strict";
var app;

app = angular.module('imo-ng', []);

app.directive("imo-surface-reaction", function() {
  return {
    restrict: "A",
    template: '<div class="imo-surface-reaction-click"></div>',
    link: function($scope, $el) {
      return console.log(arguments);
    }
  };
});
