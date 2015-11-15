// Views Module

function init(app) {
  rootPath = app.config.root
}

function commitView(path, root) {
  var fs = require('fs')
  var view = fs.readFileSync((root || rootPath) + "/" + path, 'utf8')
  $("#panel").append(view)
}

function createOverlay(id, path) {
  $("body").append(
    "<div id='" + id + "' class='overlay'></div>"
  )

  var fs = require('fs')
  var view = fs.readFileSync(path, 'utf8')
  $("#" + id).append(view)

  return $("#" + id)
}

function appendView(path, root) {
  var fs = require('fs')
  var npath = require('path')
  var view = fs.readFileSync(path, 'utf8')

  var p = npath.parse(npath.normalize(path)).dir
  view = view.replace(/{{root}}/g, p)

  $(root).append(view)
}

var rootPath = ""

module.exports = {
  init: init,
  commitView: commitView,
  appendView: appendView,
  createOverlay: createOverlay
}
