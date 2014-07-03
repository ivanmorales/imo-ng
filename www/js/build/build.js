"use strict";
var app;

app = angular.module('imo', ['ngTouch']).controller('TabSliderCtrl', [
  "$scope", function($scope) {
    $scope.items = [
      {
        title: "Today",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, accusamus? Debitis repellat, unde fugit adipisci neque distinctio modi provident cumque maxime similique harum in eos ducimus veniam, itaque, nam non."
      }, {
        title: "Tonight",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quisquam reprehenderit assumenda culpa ipsa earum necessitatibus sint quod, nulla in suscipit nam dicta, totam quibusdam nihil quis fuga temporibus illum!"
      }, {
        title: "Tomorrow",
        content: "<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta doloribus in quos provident quibusdam fugiat, voluptas, doloremque autem debitis architecto nam labore nihil pariatur fugit consectetur possimus itaque cumque. Reprehenderit.</div> <div>Culpa eius eligendi a, vitae minima exercitationem ipsum dolorum, qui, cum nihil necessitatibus tenetur incidunt aperiam optio soluta, repudiandae blanditiis accusantium atque assumenda excepturi vel. Neque at corporis numquam rem.</div>"
      }, {
        title: "Weekend",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aliquam asperiores modi aspernatur dignissimos totam enim ipsum delectus vel natus id soluta maxime sunt tenetur laudantium dolorum odio aliquid, aut."
      }, {
        title: "Tomorrow 1",
        content: "<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta doloribus in quos provident quibusdam fugiat, voluptas, doloremque autem debitis architecto nam labore nihil pariatur fugit consectetur possimus itaque cumque. Reprehenderit.</div> <div>Culpa eius eligendi a, vitae minima exercitationem ipsum dolorum, qui, cum nihil necessitatibus tenetur incidunt aperiam optio soluta, repudiandae blanditiis accusantium atque assumenda excepturi vel. Neque at corporis numquam rem.</div>"
      }, {
        title: "Weekend 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aliquam asperiores modi aspernatur dignissimos totam enim ipsum delectus vel natus id soluta maxime sunt tenetur laudantium dolorum odio aliquid, aut."
      }
    ];
  }
]);

app.directive("imoSurfaceReaction", function() {
  var _class;
  _class = "imo-surface-reaction-click";
  return {
    restrict: "A",
    transclude: true,
    template: "<div imo-surface-reaction-click-circle></div><div ng-transclude></div>",
    controller: [
      "$scope", function($scope) {
        $scope.circle = null;
        this.registerCircle = function(element) {
          $scope.circle = element;
        };
      }
    ],
    link: function(scope, element) {
      scope.showCircle = false;
      element.bind('mousedown', function(e) {
        if (scope.showCircle) {
          return;
        }
        scope.showCircle = true;
        element.addClass(_class);
        scope.circle.stop(true, true).css({
          width: "0px",
          height: "0px",
          top: "" + (e.clientY - element.offset().top) + "px",
          left: "" + (e.clientX - element.offset().left) + "px",
          opacity: "1"
        }).animate({
          width: "500px",
          height: "500px",
          top: "-=250",
          left: "-=250",
          opacity: "0"
        }, 500, function() {
          scope.showCircle = false;
          element.removeClass(_class);
        });
      });
    }
  };
}).directive("imoSurfaceReactionClickCircle", function() {
  return {
    restrict: "A",
    require: "^imoSurfaceReaction",
    replace: true,
    template: "<div class=\"imo-surface-reaction-click-circle\"></div>",
    link: function(scope, element, attrs, controller) {
      controller.registerCircle(element);
    }
  };
}).directive("imoTabSliderItem", [
  "$q", function($q) {
    return {
      scope: {
        label: "@",
        current: "@"
      },
      restrict: "E",
      replace: true,
      require: "^imoTabSlider",
      transclude: true,
      template: "<div class=\"imo-tab-slider-item\" current=\"{{current}}\" ng-show=\"tabIndex == current\" ng-transclude></div>",
      link: function(scope, element, attrs, controller) {
        var tab;
        scope.current = 0;
        scope.tabIndex = controller.currentTabLength();
        tab = {
          label: scope.label,
          element: element,
          index: scope.tabIndex
        };
        return controller.registerTab(tab);
      }
    };
  }
]).directive("imoTabSlider", [
  '$q', '$timeout', function($q, $timeout) {
    var hammerOptions, _private;
    hammerOptions = {
      drag: false,
      transform: false,
      swipe_velocity: 0.3
    };
    _private = {
      adjustLabelBar: function(scope, tab) {
        var $active, $ul;
        $active = tab.labelElement;
        $ul = $active.parent();
        if ($active.length === 0) {
          return;
        }
        scope.left = -1 * ($active.position().left - 50);
        if (scope.left > 0) {
          scope.left = 0;
        }
        if (($ul.width() + scope.left) < $ul.parent().width()) {
          return scope.left = $ul.parent().width() - $ul.width();
        }
      }
    };
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      template: "<div class=\"imo-tab-slider\">\n  <div class=\"imo-tab-slider-labels\">\n    <ul style=\"left:{{left}}px\">\n      <li ng-repeat=\"tab in tabs\" ng-click=\"scrollTo(tab)\" ng-class=\"{active: current == tab.index}\">{{tab.label}}</li>\n    </ul>\n  </div>\n  <div class=\"imo-tab-slider-slides\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\" ng-transclude></div>\n</div>",
      controller: [
        "$scope", function($scope) {
          $scope.tabs = [];
          this.registerTab = function(tab) {
            $scope.tabs.push(tab);
          };
          this.currentTabLength = function() {
            return $scope.tabs.length;
          };
          $scope.prev = (function(_this) {
            return function() {
              var idx;
              idx = $scope.current === 0 ? 0 : $scope.current - 1;
              $scope.scrollTo($scope.tabs[idx], null);
            };
          })(this);
          $scope.next = (function(_this) {
            return function() {
              var idx, max;
              max = _this.currentTabLength() - 1;
              idx = $scope.current === max ? max : $scope.current + 1;
              $scope.scrollTo($scope.tabs[idx], null);
            };
          })(this);
          $scope.scrollTo = function(tab) {
            $scope.currentTab = tab;
            if (tab.labelElement == null) {
              tab.labelElement = $scope.element.find('.imo-tab-slider-labels ul li').eq(tab.index);
            }
            $scope.current = tab.index;
            _private.adjustLabelBar($scope, tab);
          };
        }
      ],
      link: function(scope, element, attrs) {
        scope.element = element;
        scope.current = 0;
        scope.currentTab = null;
        scope.left = 0;
        return scope.currentLabel = null;
      }
    };
  }
]);
