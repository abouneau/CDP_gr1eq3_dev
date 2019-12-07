/* eslint-disable no-unused-vars */
function showDetail (id) {
  document.getElementById(id).style.display = ''
  document.getElementById('showButton' + id).style.display = 'none'
  document.getElementById('hideButton' + id).style.display = ''
}
function hideDetail (id) {
  document.getElementById(id).style.display = 'none'
  document.getElementById('showButton' + id).style.display = ''
  document.getElementById('hideButton' + id).style.display = 'none'
}