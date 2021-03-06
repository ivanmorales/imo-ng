angular.module("imo", ["ngTouch"])
  .directive "imoSurfaceReaction", ->
    _class = "imo-surface-reaction-click"

    scope: {}
    restrict: "A"
    transclude: true
    template: "<div imo-surface-reaction-click-circle></div><div ng-transclude></div>"
    controller: ["$scope", ($scope)->
      $scope.circle = null

      @registerCircle = (element)->
        $scope.circle = jQuery(element)
        return
      return
    ]
    link: (scope, element)->
      scope.showCircle = false
      element
        .bind 'mousedown', (e)->
          return if scope.showCircle
          scope.showCircle = true
          element.addClass(_class)

          scope.circle
            .stop(true, true)
            .css
              width: "40px"
              height: "40px"
              top: "#{e.clientY - element.offset().top - 20}px"
              left: "#{e.clientX - element.offset().left - 20}px"
              opacity: "0.75"


            .animate
              width: "300px"
              height: "300px"
              top: "-=150"
              left: "-=150"
              opacity: "0"
            , 500, ->
              scope.showCircle = false
              element.removeClass(_class)
              return          
          return
      return

  .directive "imoSurfaceReactionClickCircle", ->
    restrict: "A"
    require: "^imoSurfaceReaction"
    replace: true
    template: "<div class=\"imo-surface-reaction-click-circle\"></div>"
    link: (scope, element, attrs, controller)->
      controller.registerCircle(element)
      return

  .directive "imoTabSliderItem", ["$q", ($q)->
    restrict: "E"
    replace: true
    require: "^imoTabSlider"
    transclude: true
    template: """<div class="imo-tab-slider-item" ng-show="tabIndex == outer.current" ng-transclude></div>"""
    link: (scope, element, attrs, controller)->
      scope.current = 0
      scope.tabIndex = controller.currentTabLength()
      scope.label = attrs.label
      scope.outer = controller.scope

      tab = 
        label: scope.label
        element: element
        index: scope.tabIndex

      controller.registerTab(tab)
      return
  ]

  .directive "imoTabSlider", ['$q', '$timeout', ($q, $timeout)->
    _private = 
      adjustLabelBar: (scope, tab)->
        $active = tab.labelElement
        $ul = $active.parent()
        return if $active.length is 0

        # Figure out what left is
        scope.left = -1 * ($active.position().left - 50)
        scope.left = 0 if scope.left > 0
        scope.left = ($ul.parent().width() - $ul.width()) if ($ul.width() + scope.left) < $ul.parent().width()
        return

        return
    restrict: "E"
    replace: true
    transclude: true
    scope:
      control: "="
    template: """
      <div class="imo-tab-slider">
        <div class="imo-tab-slider-labels">
          <ul style="left:{{left}}px">
            <li ng-repeat="tab in tabs" ng-click="scrollTo(tab)" ng-class="{active: current == tab.index}">{{tab.label}}</li>
          </ul>
        </div>
        <div class="imo-tab-slider-slides" ng-swipe-right="prev()" ng-swipe-left="next()" ng-transclude></div>
      </div>"""
    controller: ["$scope", ($scope)->
      $scope.tabs = []

      $scope.current = 0
      $scope.currentTab = null
      $scope.left = 0
      $scope.currentLabel = null

      @scope = $scope
      @registerTab = (tab)->
        $scope.tabs.push(tab)
        return

      @currentTabLength = ->
        $scope.tabs.length


      $scope.prev = =>
        idx = if $scope.current is 0 then 0 else $scope.current - 1
        $scope.scrollTo($scope.tabs[idx], null)
        return

      $scope.next = =>
        max = @currentTabLength() - 1
        idx = if $scope.current is max then max else $scope.current + 1
        $scope.scrollTo($scope.tabs[idx], null)
        return

      $scope.scrollTo = (tab)->
        $scope.currentTab = tab

        tab.labelElement ?= $scope.element.find('.imo-tab-slider-labels ul li').eq(tab.index)
        $scope.current = tab.index

        _private.adjustLabelBar($scope, tab)

        return

      $scope.internalControl = $scope.control or {}
      $scope.internalControl.clearTabs = ->
        $scope.tabs = []
        $scope.current = 0
        $scope.left = 0
        return

      return
    ]
    link: (scope, element, attrs)->
      scope.element = jQuery(element)
      return
  ]