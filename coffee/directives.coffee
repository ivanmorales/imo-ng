app
  .directive "imoSurfaceReaction", ['$timeout', ($timeout)->
    _class = "imo-surface-reaction-click"

    restrict: "A"
    transclude: true
    template: "<div class=\"#{_class}-circle\"></div><div ng-transclude></div>"
    link: ($scope, $el)->
      $el
        .bind 'mousedown', (e)->
          return if $el.hasClass(_class)

          $el.addClass(_class)

          $circle = $el.find(".#{_class}-circle")
            .show()
            .stop(true, true)
            .css
              width: "0px"
              height: "0px"
              top: "#{e.clientY - $el.offset().top + jQuery(document).scrollTop()}px"
              left: "#{e.clientX - $el.offset().left}px"
              opacity: "1"

            .animate
              width: "500px"
              height: "500px"
              top: "-=250"
              left: "-=250"
              opacity: "0"
            , 500, ->
              jQuery(@).hide()
              $el.removeClass(_class)
              return          
          return
      return
  ]

  .directive "imoTabSliderItem", ["$q", ($q)->
    scope: 
      label: "@"
    restrict: "E"
    replace: true
    require: "^imoTabSlider"
    transclude: true
    template: """<div class="imo-tab-slider-item" ng-transclude></div>"""
    link: ($scope, $el, $attrs, $outerController)->
      tab = 
        label: $scope.label
        element: $el
      $outerController.registerTab(tab)
      return
  ]

  .directive "imoTabSlider", ['$q', '$timeout', ($q, $timeout)->
    hammerOptions = 
      drag: false
      transform: false
      swipe_velocity: 0.3

    scope: {}
    restrict: "E"
    replace: true
    transclude: true
    template: """
    <div class="imo-tab-slider">
      <div class="imo-tab-slider-labels">
        <ul>
          <li ng-repeat="tab in tabs" data-tab-index="{{$index}}"><strong>{{tab.label}}</strong></li>
        </ul>
      </div>
      <div class="imo-tab-slider-slides" ng-transclude></div>
    </div>"""
    controller: ["$scope", ($scope)->
      $scope.tabs = []
      @registerTab = (tab)->
        $scope.tabs.push(tab)
        return
      return
    ]
    link: ($scope, $el, $attrs)->
      $scope.current = null

      $slides = $el.find(".imo-tab-slider-labels")

      $slides
        .on "click", "li", (e)->
          $(@).trigger("selectTab")
          return
        .on "selectTab", "li", (e)->
          $obj = $(@).addClass('active').siblings().removeClass('active')

          tab = $scope.tabs[$obj.data('tab-index')]

          if $scope.current?
            $scope.current.element.hide()

          tab.element.show().css
            top: 0
            left: 0
          $scope.current = tab

          $el.height(tab.element.height() + $slides.height())

          return
          

      Hammer($el.find(".imo-tab-slider-slides")[0], hammerOptions)
        .on "swipeleft swiperight", (e)->
          console.log e.type
          return


      $timeout ->
        return if $scope.tabs.length is 0
        
        $el.find(".imo-tab-slider-labels ul li:first").trigger('selectTab')
      , 0

      return
  ]