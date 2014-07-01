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
          position = $el.offset()
          left = e.clientX - position.left
          top = e.clientY

          $timeout ->
            $circle.hide()
            $el.removeClass(_class)
          , 500

          $circle = $el.find(".#{_class}-circle")
            .show()
            .stop(true, true)
            .css
              width: "0px"
              height: "0px"
              top: "#{top}px"
              left: "#{left}px"
              opacity: "1"

            .animate
              width: "500px"
              height: "500px"
              top: "-=250"
              left: "-=250"
              opacity: "0"
            , 500
          return
  ]