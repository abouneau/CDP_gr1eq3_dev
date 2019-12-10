/* eslint-disable no-undef */
$(document).ready(
  function () {
    $('.option').click(
      function (event) {
        $(this).addClass('active').siblings().removeClass('active')
        for (node of document.getElementsByClassName('task')) {
          if (node.id !== $(this)[0].id) {
            node.style.display = 'none'
          } else {
            node.style.display = 'block'
          }
        }
      }
    )
  })
