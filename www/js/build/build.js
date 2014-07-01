"use strict";
var app;

app = angular.module('imo', []);

app.directive("imoSurfaceReaction", [
  '$timeout', function($timeout) {
    var _class;
    _class = "imo-surface-reaction-click";
    return {
      restrict: "A",
      transclude: true,
      template: "<div class=\"" + _class + "-circle\"></div><div ng-transclude></div>",
      link: function($scope, $el) {
        $el.bind('mousedown', function(e) {
          var $circle, left, position, top;
          if ($el.hasClass(_class)) {
            return;
          }
          $el.addClass(_class);
          position = $el.offset();
          left = e.clientX - position.left;
          top = e.clientY;
          $timeout(function() {
            $circle.hide();
            return $el.removeClass(_class);
          }, 500);
          return $circle = $el.find("." + _class + "-circle").show().stop(true, true).css({
            width: "0px",
            height: "0px",
            top: "" + top + "px",
            left: "" + left + "px",
            opacity: "1"
          }).animate({
            width: "500px",
            height: "500px",
            top: "-=250",
            left: "-=250",
            opacity: "0"
          }, 500);
        });
      }
    };
  }
]);
