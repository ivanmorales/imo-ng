angular.module("imo", ["ngTouch"]).directive("imoSurfaceReaction", function() {
  var _class;
  _class = "imo-surface-reaction-click";
  return {
    scope: {},
    restrict: "A",
    transclude: true,
    template: "<div imo-surface-reaction-click-circle></div><div ng-transclude></div>",
    controller: [
      "$scope", function($scope) {
        $scope.circle = null;
        this.registerCircle = function(element) {
          $scope.circle = jQuery(element);
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
          width: "40px",
          height: "40px",
          top: "" + (e.clientY - element.offset().top - 20) + "px",
          left: "" + (e.clientX - element.offset().left - 20) + "px",
          opacity: "0.75"
        }).animate({
          width: "300px",
          height: "300px",
          top: "-=150",
          left: "-=150",
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
      restrict: "E",
      replace: true,
      require: "^imoTabSlider",
      transclude: true,
      template: "<div class=\"imo-tab-slider-item\" ng-show=\"tabIndex == outer.current\" ng-transclude></div>",
      link: function(scope, element, attrs, controller) {
        var tab;
        scope.current = 0;
        scope.tabIndex = controller.currentTabLength();
        scope.label = attrs.label;
        scope.outer = controller.scope;
        tab = {
          label: scope.label,
          element: element,
          index: scope.tabIndex
        };
        controller.registerTab(tab);
      }
    };
  }
]).directive("imoTabSlider", [
  '$q', '$timeout', function($q, $timeout) {
    var _private;
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
          scope.left = $ul.parent().width() - $ul.width();
        }
        return;
      }
    };
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        control: "="
      },
      template: "<div class=\"imo-tab-slider\">\n  <div class=\"imo-tab-slider-labels\">\n    <ul style=\"left:{{left}}px\">\n      <li ng-repeat=\"tab in tabs\" ng-click=\"scrollTo(tab)\" ng-class=\"{active: current == tab.index}\">{{tab.label}}</li>\n    </ul>\n  </div>\n  <div class=\"imo-tab-slider-slides\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\" ng-transclude></div>\n</div>",
      controller: [
        "$scope", function($scope) {
          $scope.tabs = [];
          $scope.current = 0;
          $scope.currentTab = null;
          $scope.left = 0;
          $scope.currentLabel = null;
          this.scope = $scope;
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
          $scope.internalControl = $scope.control || {};
          $scope.internalControl.clearTabs = function() {
            $scope.tabs = [];
            $scope.current = 0;
            $scope.left = 0;
          };
        }
      ],
      link: function(scope, element, attrs) {
        scope.element = jQuery(element);
      }
    };
  }
]);
