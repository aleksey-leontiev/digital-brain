// Modules Management Module

// Creates API for specified module
function createModuleApi(module, config, modules) {
  var merge    = require("merge")
  var rootPath = config.moduleRootPath
  var moduleId = module.info.id

  // generic API
  var api = {
    module: {
      config: config,
      request: function(path, customConfig) {
        return app.modules.load(
          getModuleAbsolutePath(path, config),
          customConfig || config)
      }
    }
  }

  // injects APIs produced by other modules
  modules.forEach(function (m) {
    var apiConf = { moduleId: moduleId, rootPath: rootPath }
    api = merge(api, m.commitToApi(apiConf))
  })

  // store API
  apis[moduleId] = api

  return api;
}

// Returns module API by module Id
function getModuleApi(moduleId) {
  return apis[moduleId]
}

function getModuleAbsolutePath(path, config) {
  var npath  = require("path")
  var prefix = "app:" // used to locate app shared modules
  return (path.startsWith(prefix)) ?
    npath.join(app.config.appRootPath, "modules", path.substring(prefix.length)) :
    npath.join(config.moduleRootPath, path)
}

var apis = {}

module.exports = {
  createModuleApi: createModuleApi,
  getModuleApi: getModuleApi
}
