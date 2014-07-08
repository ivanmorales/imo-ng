"use strict"

imoApp = angular
  .module 'imo', [
    'ngTouch'
  ]
  .controller 'TabSliderCtrl', ["$scope", ($scope)->
    $scope.items = [
      {
        title: "Today"
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, accusamus? Debitis repellat, unde fugit adipisci neque distinctio modi provident cumque maxime similique harum in eos ducimus veniam, itaque, nam non."
      },
      {
        title: "Tonight"
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quisquam reprehenderit assumenda culpa ipsa earum necessitatibus sint quod, nulla in suscipit nam dicta, totam quibusdam nihil quis fuga temporibus illum!"
      },
      {
        title: "Tomorrow"
        content: "<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta doloribus in quos provident quibusdam fugiat, voluptas, doloremque autem debitis architecto nam labore nihil pariatur fugit consectetur possimus itaque cumque. Reprehenderit.</div>
        <div>Culpa eius eligendi a, vitae minima exercitationem ipsum dolorum, qui, cum nihil necessitatibus tenetur incidunt aperiam optio soluta, repudiandae blanditiis accusantium atque assumenda excepturi vel. Neque at corporis numquam rem.</div>"
      },
      {
        title: "Weekend"
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aliquam asperiores modi aspernatur dignissimos totam enim ipsum delectus vel natus id soluta maxime sunt tenetur laudantium dolorum odio aliquid, aut."
      },
      {
        title: "Tomorrow 1"
        content: "<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta doloribus in quos provident quibusdam fugiat, voluptas, doloremque autem debitis architecto nam labore nihil pariatur fugit consectetur possimus itaque cumque. Reprehenderit.</div>
        <div>Culpa eius eligendi a, vitae minima exercitationem ipsum dolorum, qui, cum nihil necessitatibus tenetur incidunt aperiam optio soluta, repudiandae blanditiis accusantium atque assumenda excepturi vel. Neque at corporis numquam rem.</div>"
      },
      {
        title: "Weekend 2"
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aliquam asperiores modi aspernatur dignissimos totam enim ipsum delectus vel natus id soluta maxime sunt tenetur laudantium dolorum odio aliquid, aut."
      },
    ]
    return
  ]