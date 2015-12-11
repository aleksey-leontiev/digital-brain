// Modules Management Module

function getConfig(moduleId) {
  return configs[moduleId]
}

function loadConfigs() {
  var jsonfile = require("jsonfile")
  var util     = require("util")
  var path     = app.config.userDataPath + "/moduleConfigs.json"
  configs      = jsonfile.readFileSync(path)

  return configs
}

function saveConfigs(modules) {
  var jsonfile = require("jsonfile")
  var path     = app.config.userDataPath + "/moduleConfigs.json"
  var result   = {}

  for (var moduleId in modules) {
    var moduleConfig = modules[moduleId].config
    if (moduleConfig) { result[moduleId] = moduleConfig }
  }

  jsonfile.writeFileSync(path, result)
}

var configs = {}

module.exports = {
  loadConfigs: loadConfigs,
  saveConfigs: saveConfigs,
  getConfig:   getConfig
}
