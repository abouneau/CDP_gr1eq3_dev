exports.pageNotFound = function (res, err) {
  console.error(err)
  res.redirect('/pageNotFound')
}
