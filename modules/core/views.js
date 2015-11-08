// Views Module

function init(app) {
  rootPath = app.config.root
}

function commitView(path, root) {
  var fs = require('fs')
  var view = fs.readFileSync((root || rootPath) + "/" + path, 'utf8')
  $("#panel").append(view)
}

var rootPath = ""

module.exports = {
  init: init,
  commitView: commitView
}
