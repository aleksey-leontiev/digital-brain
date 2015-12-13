// Modules Management Module

function init(app) {
  configs = require("./configs")
  apis    = require("./api")
  configs.loadConfigs()
  return this
}

function load(path, config) {
  var shared = require("./shared")
  var moduleConfig = (config == null ? {} : config)
  if (moduleConfig.moduleRootPath == null) {
    moduleConfig.moduleRootPath = shared.getModuleRootPath(path)
  }

  var loadingModule = require(shared.getModuleAbsolutePath(path, config))
  if (loadingModule.info == null) {
    throw "Module info is not defined"
  }
  if (loadingModule.info.id == null) {
    throw "Module info.id is not defined"
  }
  if (loadingModule.load == null) {
    throw "Module load(api, config) function is not defined"
  }

  var api = apis.createModuleApi(loadingModule, moduleConfig, apiModules(loadedModules))
  loadingModule.load(api, moduleConfig)
  loadedModules[loadingModule.info.id] = loadingModule

  var storedConfig = configs.getConfig(loadingModule.info.id)
  if (storedConfig) { loadingModule.config = storedConfig }

  return loadingModule
}

function unload(moduleId) {
  var m = loadedModules[moduleId]
  if (m) m.unload(apis.getModuleApi(moduleId))
  return m
}

function get(moduleId) {
  return loadedModules[moduleId]
}

function saveConfigs() {
  configs.saveConfigs(loadedModules)
}

function getRootPath(path) {
  var _path = require("path")
  var p = _path.parse(_path.normalize(path))
  return _path.join(
    p.root,
    p.dir) + _path.sep
}

function apiModules(modules) {
  var underscore = require("underscore")
  var array = underscore.map(modules)
  return underscore.reject(array, function(m) {
    return m.commitToApi == null
  })
}

var apis = {}
var configs
var loadedModules = {}

module.exports = {
  init: init,
  load: load,
  unload: unload,
  saveConfigs: saveConfigs,
  get: get
}
