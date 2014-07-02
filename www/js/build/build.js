"use strict";
var app;

app = angular.module('imo', []).controller('TabSliderCtrl', [
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
      }
    ];
  }
]);

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
          var $circle;
          if ($el.hasClass(_class)) {
            return;
          }
          $el.addClass(_class);
          $circle = $el.find("." + _class + "-circle").show().stop(true, true).css({
            width: "0px",
            height: "0px",
            top: "" + (e.clientY - $el.offset().top + jQuery(document).scrollTop()) + "px",
            left: "" + (e.clientX - $el.offset().left) + "px",
            opacity: "1"
          }).animate({
            width: "500px",
            height: "500px",
            top: "-=250",
            left: "-=250",
            opacity: "0"
          }, 500, function() {
            jQuery(this).hide();
            $el.removeClass(_class);
          });
        });
      }
    };
  }
]).directive("imoTabSliderItem", [
  "$q", function($q) {
    return {
      scope: {
        label: "@"
      },
      restrict: "E",
      replace: true,
      require: "^imoTabSlider",
      transclude: true,
      template: "<div class=\"imo-tab-slider-item\" ng-transclude></div>",
      link: function($scope, $el, $attrs, $outerController) {
        var tab;
        tab = {
          label: $scope.label,
          element: $el
        };
        $outerController.registerTab(tab);
      }
    };
  }
]).directive("imoTabSlider", [
  '$q', '$timeout', function($q, $timeout) {
    var hammerOptions;
    hammerOptions = {
      drag: false,
      transform: false,
      swipe_velocity: 0.3
    };
    return {
      scope: {},
      restrict: "E",
      replace: true,
      transclude: true,
      template: "<div class=\"imo-tab-slider\">\n  <div class=\"imo-tab-slider-labels\">\n    <ul>\n      <li ng-repeat=\"tab in tabs\" data-tab-index=\"{{$index}}\"><strong>{{tab.label}}</strong></li>\n    </ul>\n  </div>\n  <div class=\"imo-tab-slider-slides\" ng-transclude></div>\n</div>",
      controller: [
        "$scope", function($scope) {
          $scope.tabs = [];
          this.registerTab = function(tab) {
            $scope.tabs.push(tab);
          };
        }
      ],
      link: function($scope, $el, $attrs) {
        var $slides;
        $scope.current = null;
        $slides = $el.find(".imo-tab-slider-labels");
        $slides.on("click", "li", function(e) {
          $(this).trigger("selectTab");
        }).on("selectTab", "li", function(e) {
          var $obj, tab;
          $obj = $(this).addClass('active').siblings().removeClass('active');
          tab = $scope.tabs[$obj.data('tab-index')];
          if ($scope.current != null) {
            $scope.current.element.hide();
          }
          tab.element.show().css({
            top: 0,
            left: 0
          });
          $scope.current = tab;
          $el.height(tab.element.height() + $slides.height());
        });
        Hammer($el.find(".imo-tab-slider-slides")[0], hammerOptions).on("swipeleft swiperight", function(e) {
          console.log(e.type);
        });
        $timeout(function() {
          if ($scope.tabs.length === 0) {
            return;
          }
          return $el.find(".imo-tab-slider-labels ul li:first").trigger('selectTab');
        }, 0);
      }
    };
  }
]);
