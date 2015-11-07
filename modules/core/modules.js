// Modules Management Module

function init(app) {
  _app  = app
  rootPath = app.config.root
}

function load(modulePath) {
  var newModule = loadedModules[modulePath]

  if (newModule == undefined) {
    newModule = require(rootPath + modulePath)
    if (newModule.init != null) newModule.init(_app)
    loadedModules[modulePath] = newModule
  }

  return newModule
}

var loadedModules = {}
var _app = null
var rootPath = ""

module.exports = {
  init: init, load: load
}
