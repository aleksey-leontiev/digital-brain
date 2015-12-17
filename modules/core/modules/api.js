// Modules Management Module :: APIs

function init(application) {
  app = application
  return this
}

// Creates API for specified module
function createModuleApi(module, config, modules) {
  var merge    = require("merge")
  var rootPath = config.moduleRootPath
  var moduleId = module.info.id

  // generic API
  var api = {
    app: {
      config: app.config,
    },
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
var app

module.exports = {
  init:            init,
  createModuleApi: createModuleApi,
  getModuleApi:    getModuleApi
}
