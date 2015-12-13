// Modules Management Module :: APIs

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
          path, customConfig || config)
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

var apis = {}

module.exports = {
  createModuleApi: createModuleApi,
  getModuleApi: getModuleApi
}
