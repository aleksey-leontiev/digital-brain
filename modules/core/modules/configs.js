// Modules Management Module :: Configs

function init(userDataFolderPath) {
  userDataPath = userDataFolderPath
  return this
}

function getConfig(moduleId) {
  return configs[moduleId]
}

function loadConfigs() {
  try {
    var npath    = require("path")
    var jsonfile = require("jsonfile")
    var path     = npath.join(userDataPath, fileName)
    configs      = jsonfile.readFileSync(path)

    return configs
  } catch(err) {
    return {}
  }
}

function saveConfigs(modules) {
  var npath    = require("path")
  var jsonfile = require("jsonfile")
  var path     = npath.join(userDataPath, fileName)
  var result   = {}

  for (var moduleId in modules) {
    var moduleConfig = modules[moduleId].config
    if (moduleConfig) { result[moduleId] = moduleConfig }
  }

  jsonfile.writeFileSync(path, result)
}

var configs = {}
var userDataPath = ""
var fileName = "moduleConfigs.json"

module.exports = {
  init:        init,
  loadConfigs: loadConfigs,
  saveConfigs: saveConfigs,
  getConfig:   getConfig
}
