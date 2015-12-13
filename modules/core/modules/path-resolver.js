// Modules Management Module :: Shared

// app:group/module      => /app/modules/group/module/module.js
// app:group/module.js   => /app/modules/group/module.js
// module:group/features => /module/group/features/features.js
// module:shared.js      => /module/shared.js

function init(app) {
  npath = require("path")
  appModuleRootPath = app.config.moduleRootPath
  return this
}

function getModuleAbsolutePath(path, config) {
  var result = path
  result = resolveRoot(result, config)
  result = resolveFile(result)
  return result
}

function getModuleRootPath(path) {
  var result = path
  result = resolveRoot(result)
  result = getStepBackPath(result)
  return result + "/"
}

// private

function resolveRoot(path, config) {
  var moduleRootPath = (config != null ? config.moduleRootPath || "" : "")

  // replaces appRefix and modulePrefix to the real paths
  // app:module.js      => /app/modules/module.js
  // module:features.js => /module/features.js
  var result = path
    .replace(appPrefix,    appModuleRootPath)
    .replace(modulePrefix, moduleRootPath)

  // path without prefix points on module root path
  // shared.js => /module/root/shared.js
  if (!isPathContainsPrefix(path)) {
    result = (config.moduleRootPath + result)
  }

  return result
}

function resolveFile(path) {
  if (!isPointsOnFile(path)) {
    var fileName = (getLastDirName(path) + ".js")
                    .replace(appPrefix, "").replace(modulePrefix, "")
    return npath.join(path, fileName)
  } else
    return path
}

function getLastDirName(path) {
  return path.split("/").splice(-1)
}

function getStepBackPath(path) {
  if (!isPointsOnFile(path)) {
    return path
  } else {
    return npath.parse(path).dir
  }
}

function isPathContainsPrefix(path) {
  return path.startsWith(appPrefix) || path.startsWith(modulePrefix)
}

function isPointsOnFile(path) {
  var extname = npath.extname(path)
  return extname != ""
}

var appPrefix    = "app:"
var modulePrefix = "module:"
var appModuleRootPath
var npath

ap = getModuleAbsolutePath
rp = getModuleRootPath

module.exports = {
  init:                  init,
  getModuleAbsolutePath: getModuleAbsolutePath,
  getModuleRootPath:     getModuleRootPath
}
