// Modules Management Module

function init(app) {
  _app  = app
  nodePath = require('path')
}

function load(modulePath, data) {
  var path          = nodePath.parse(nodePath.normalize(modulePath))
  var moduleId      = nodePath.format(path)
  var loadingModule = loadedModules[moduleId]
  var moduleInfo    = null
  var moduleConfig  = (data == null ? {} : data)

  if (moduleConfig.moduleRootPath == null) {
    moduleConfig.moduleRootPath = nodePath.join(path.root, path.dir) + nodePath.sep
  }

  if (loadingModule == null) {
    loadingModule = require(moduleId)
    if (loadingModule.moduleInfo != null) {
      moduleId = loadingModule.moduleInfo.id
    }

    var checkModule = loadedModules[moduleId]
    if (checkModule != null) {
      return checkModule
    }

    if (loadingModule.init != null) {
      loadingModule.init(_app, moduleConfig)
    }

    loadedModules[nodePath.format(path)] = loadingModule
    loadedModules[moduleId] = loadingModule
  }

  return loadingModule
}

function loadModules(path, modulesList, data) {
  var modules = []

  modulesList.forEach(function (module) {
    var mpath = nodePath.join(path, module)
    modules.push(load(mpath, data))
  })

  return modules
}

var loadedModules = {}
var _app = null
var nodePath = null

module.exports = {
  init: init, load: load, loadModules: loadModules
}
