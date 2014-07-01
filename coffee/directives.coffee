app
  .directive "imo-surface-reaction", ->
    restrict: "A"
    template: '<div class="imo-surface-reaction-click"></div>'
    link: ($scope, $el)->
      console.log arguments