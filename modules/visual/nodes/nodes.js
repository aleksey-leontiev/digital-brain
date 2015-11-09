// Visual Nodes Module

function init(app, config) {
  var path = __dirname + "/"

  app.modules.loadModules(config.moduleRootPath, [
    "nodes/features/create",
    "nodes/features/drag",
    "nodes/features/select",
    "nodes/features/update"
  ], config)
}

module.exports = { init: init }
