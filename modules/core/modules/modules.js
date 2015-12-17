// Modules Management Module

function init(app) {
  configs      = require("./configs").init(app.config.userDataPath)
  apis         = require("./api").init(app)
  pathResolver = require("./path-resolver").init(app)

  configs.loadConfigs()
  return this
}

function load(path, config) {
  var moduleConfig = (config == null ? {} : config)
  if (moduleConfig.moduleRootPath == null) {
    moduleConfig.moduleRootPath = pathResolver.getModuleRootPath(path)
  }

  var loadingModule = require(pathResolver.getModuleAbsolutePath(path, config))
  if (loadingModule.info == null) {
    throw "Module info is not defined"
  }
  if (loadingModule.info.id == null) {
    throw "Module info.id is not defined"
  }
  if (loadingModule.load == null) {
    throw "Module load(api, config) function is not defined"
  }

  // check module already loaded
  var cached = loadedModules[loadingModule.info.id]
  if (cached != null) { return cached }

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
  return configs.saveConfigs(loadedModules)
}

function list() {
  return loadedModules
}

// private

function apiModules(modules) {
  var underscore = require("underscore")
  var array = underscore.map(modules)
  return underscore.reject(array, function(m) {
    return m.commitToApi == null
  })
}

var apis = {}
var configs
var pathResolver
var loadedModules = {}

module.exports = {
  init: init,
  load: load,
  unload: unload,
  saveConfigs: saveConfigs,
  get: get,
  list: list
}
