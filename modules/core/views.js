// Views Module

function init(app) {
  rootPath = app.config.root
}

function commitView(path, title) {
  var fs = require('fs')
  var view = fs.readFileSync(rootPath + path, 'utf8')
  $("#panel").append(view)
}

var rootPath = ""

module.exports = {
  init: init,
  commitView: commitView
}
