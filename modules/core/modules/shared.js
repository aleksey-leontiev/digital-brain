
// app:group/module      => /app/modules/group/module/module.js
// app:group/module.js   => /app/modules/group/module.js
// module:group/features => /module/group/features/features.js
// module:shared.js      => /module/shared.js

function init(application) {
  app = application
  return this
}

function getModuleAbsolutePath(path, config) {
  return resolve(path, config)
}

function getModuleRootPath(path) {
  return resolveRoot2(resolveRoot(path)) + "/"
}

function resolve(path, config) {
  return resolveRoot(resolveFile(path, config), config)
}

function resolveFile(path, config) {
  var npath   = require("path")
  var extname = npath.extname(path)
  if (extname == "") {
    var lastDir  = path.split("/").splice(-1)
    var fileName = lastDir + ".js"
    fileName = fileName.replace(appPrefix, "").replace(modulePrefix, "")

    return npath.join(path, fileName)
  } else
    return path
}

function resolveRoot2(path) {
  var npath   = require("path")
  var extname = npath.extname(path)
  if (extname == "") {
    return path
  } else {
    return npath.parse(path).dir
  }

}

function resolveRoot(path, config) {
  var result = path
    .replace(appPrefix, app.config.moduleRootPath) // TODO: FIX
    .replace(modulePrefix, config != null ? config.moduleRootPath : "")

  if (config != null && config.moduleRootPath != null) {
    if (!path.startsWith(appPrefix) && !path.startsWith(modulePrefix)) {
      result = (config.moduleRootPath + result)
    }
  }

  return result
}

var appPrefix    = "app:"
var modulePrefix = "module:"
var app

ap = getModuleAbsolutePath
rp = getModuleRootPath

module.exports = {
  init:                  init,
  getModuleAbsolutePath: getModuleAbsolutePath,
  getModuleRootPath:     getModuleRootPath
}
