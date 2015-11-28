// Modules Management Module

function init(app) {
  _app  = app
  _path = require("path")
  return this
}

function load(path, config) {
  _path = require("path")
  var path          = _path.parse(_path.normalize(path))
  var modulePath    = _path.format(path)
  var loadingModule = loadedModules[modulePath]

  var moduleConfig  = (config == null ? {} : config)
  if (moduleConfig.moduleRootPath == null) {
    moduleConfig.moduleRootPath = _path.join(path.root, path.dir) + _path.sep
  }
  if (moduleConfig.appRootPath == null) {
    moduleConfig.appRootPath = app.config.appRootPath
  }

  if (loadingModule == null) {
    loadingModule = require(modulePath)
    if (loadingModule.info == null) {
      throw "Module info is not defined"
    }
    if (loadingModule.info.id == null) {
      throw "Module info.id is not defined"
    }
    if (loadingModule.load == null) {
      throw "Module load(api, config) function is not defined"
    }

    var api = getApi(path, loadingModule.info.id, moduleConfig)
    apis[loadingModule.info.id] = api
    loadingModule.load(api, moduleConfig)
    loadedModules[modulePath] = loadingModule
    loadedModules[loadingModule.info.id] = loadingModule
  }

  return loadingModule
}

function unload(moduleId) {
  var m = loadedModules[moduleId]
  if (m) m.unload(apis[moduleId])
  return m
}

function getApi(path, moduleId, config) {
  var merge = require('merge');
  var rp = (config == null && config.moduleRootPath != null) ?
              _path.join(path.root, path.dir) + _path.sep :
              config.moduleRootPath;

  var api = {
    app: {
      rootPath: app.config.appRootPath,
      request: function(pth, config) {
        var p = app.config.appRootPath + pth
        return app.modules.load(p, config)
      }
    },
    module: {
      rootPath: rp,
      request: function(pth, config) {
        var p = rp + pth
        return app.modules.load(p, config)
      }
    },
  }

  Object.keys(loadedModules).forEach(function (k) {
    var m = loadedModules[k]
    if (m && m.commitToApi != null) {
      api = merge(api, m.commitToApi({
        moduleId: moduleId,
        rootPath: rp
      }))
    }
  })

  return api;
}

function loadModules(path, modulesList, data) {
  var modules = []

  modulesList.forEach(function (module) {
    var mpath = _path.join(path, module)
    modules.push(load(mpath, data))
  })

  return modules
}

var apis = {}
var loadedModules = {}
var _path = null

module.exports = {
  init: init, load: load, unload: unload, loadModules: loadModules
}
