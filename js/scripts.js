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

function banComma (e) {
  if (e.which == 44) {
    e.preventDefault()
    return false
  } else {
    return true
  }
}

function addIssue (value, where) {
  const oldValue = document.getElementById(where).value
  if (!((oldValue.startsWith(value) && oldValue.length === value.length) || oldValue.includes(',' + value + ',') || oldValue.includes(',' + value))) {
    if (oldValue.length === 0) {
      document.getElementById(where).value = value
    } else {
      document.getElementById(where).value = oldValue + ',' + value
    }
  }
}
