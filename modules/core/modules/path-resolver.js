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
  result = resolveFile(result, config)
  return result
}

function getModuleRootPath(path) {
  return resolveRoot2(resolveRoot(path)) + "/"
}

// private

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

function resolveFile(path, config) {
  if (!isPointsOnFile(path)) {
    var fileName = (getLastDirName(path) + ".js")
                    .replace(appPrefix, "").replace(modulePrefix, "")
    return npath.join(path, fileName)
  } else
    return path
}

function isPathContainsPrefix(path) {
  return path.startsWith(appPrefix) || path.startsWith(modulePrefix)
}

function isPointsOnFile(path) {
  var extname = npath.extname(path)
  return extname != ""
}

function getLastDirName(path) {
  return path.split("/").splice(-1)
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
