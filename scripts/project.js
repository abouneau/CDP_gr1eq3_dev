// this function manages the search bar for adding new contributors
function autocomplete (input, possibleValues) { // eslint-disable-line no-unused-vars
  var currentFocus
  /* execute a function when someone writes in the text field: */
  input.addEventListener('input', function (e) {
    let a = this.value
    let b = this.value
    let i = this.value
    const val = this.value

    closeAllLists()

    if (!val) { return false }
    currentFocus = -1
    /* create a DIV element that will contain the items (values): */
    a = document.createElement('DIV')
    a.setAttribute('id', this.id + 'autocomplete-list')
    a.setAttribute('class', 'autocomplete-items')
    /* append the DIV element as a child of the autocomplete container: */
    this.parentNode.appendChild(a)

    for (i = 0; i < possibleValues.length; i++) {
      if (possibleValues[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        b = document.createElement('DIV')
        /* make the matching letters bold: */
        b.innerHTML = '<strong>' + possibleValues[i].substr(0, val.length) + '</strong>'
        b.innerHTML += possibleValues[i].substr(val.length)
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += '<input type=\'hidden\' value=\'' + possibleValues[i] + '\'>'
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener('click', function (e) {
          input.value = this.getElementsByTagName('input')[0].value
          closeAllLists()
        })
        a.appendChild(b)
      }
    }
  })
  /* execute a function presses a key on the keyboard: */
  input.addEventListener('keydown', function (e) {
    var x = document.getElementById(this.id + 'autocomplete-list')
    if (x) x = x.getElementsByTagName('div')
    if (e.keyCode === 40) { // if down arrow pressed
      currentFocus++
      addActive(x)
    } else if (e.keyCode === 38) { // if up arrow pressed
      currentFocus--
      addActive(x)
    } else if (e.keyCode === 13) { // if enter is pressed
      e.preventDefault()
      if (currentFocus > -1) {
        if (x) x[currentFocus].click()
      }
    }
  })
  function addActive (x) {
    if (!x) return false
    /* start by removing the 'active' class on all items: */
    removeActive(x)
    if (currentFocus >= x.length) currentFocus = 0
    if (currentFocus < 0) currentFocus = (x.length - 1)
    /* add class 'autocomplete-active': */
    x[currentFocus].classList.add('autocomplete-active')
  }
  function removeActive (x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active')
    }
  }
  function closeAllLists (elmnt) {
    var x = document.getElementsByClassName('autocomplete-items')
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== input) {
        x[i].parentNode.removeChild(x[i])
      }
    }
  }
  /* execute a function when someone clicks in the document: */
  document.addEventListener('click', function (e) {
    closeAllLists(e.target)
  })
}
